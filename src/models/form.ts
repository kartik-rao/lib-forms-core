import {action, decorate, observable, computed, toJS} from "mobx";
import axios from "axios";
import {valueOrDefault} from "./common";
import Page from "./page";
import FormStore from "../store/FormStore";
import { FormEvent } from "react";
import Field from "./field";

import {IFormProps, IFormTenant, IFormContent, IFormLayoutOptions, IFormStatus, IFormItemLayoutOptions} from "./form.properties";
import { IValidationError } from "./validation";

class Form implements IFormProps {
    id: string;
    uuid: string;
    exid: string;
    desc: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    layout: any;
    stopSubmit: boolean;
    submitTarget: string;
    formLayoutOptions: IFormLayoutOptions;
    itemLayoutOptions: IFormItemLayoutOptions;
    store: FormStore
    submitError: string;
    successRedirect: string;
    errorRedirect: string;

    @action initialize(data: IFormProps, store: FormStore) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid;
        this.exid = valueOrDefault(data.exid, null);
        this.desc = valueOrDefault(data.desc, null);
        if (data.tenant) {
            this.tenant = {
                eid: valueOrDefault(data.tenant.eid, null),
                mid: valueOrDefault(data.tenant.mid, null),
                context: valueOrDefault(data.tenant.context, null),
                stack: valueOrDefault(data.tenant.stack, null)
            }
        } else {
            this.tenant = {eid:null, mid:null, context:null, stack: null}
        }

        if (data.status) {
            this.status = {
                timezone: valueOrDefault(data.status.timezone, null),
                paused: valueOrDefault(data.status.paused, null),
                active: valueOrDefault(data.status.active, null),
                created: valueOrDefault(data.status.created, null),
                edited: valueOrDefault(data.status.edited, null),
                starts: valueOrDefault(data.status.starts, null),
                ends: valueOrDefault(data.status.ends, null)
            }
        } else {
            this.status = {timezone: null, paused: false, active: false, created: null, edited: null, starts: null, ends: null}
        }

        if (data.content) {
            this.content = {
                title: valueOrDefault(data.content.title, null),
                subtitle: valueOrDefault(data.content.subtitle, null),
                labels: valueOrDefault(data.content.labels, null),
                offset: valueOrDefault(data.content.offset, null),
                width: valueOrDefault(data.content.width, null),
                sidebar: valueOrDefault(data.content.sidebar, null),
                scripts: valueOrDefault(data.content.scripts, null),
                styles: valueOrDefault(data.content.styles, null),
                datasets: valueOrDefault(data.content.datasets, null),
                pages: valueOrDefault(<Page[]>data.content.pages, []),
                paginate: valueOrDefault(data.content.paginate, false)
            }
            if (data.content.css) {
                this.content.css = {
                    inline : valueOrDefault(data.content.css.inline, []),
                    external: valueOrDefault(data.content.css.external, [])
                }
            } else {
                this.content.css = {inline: null, external: null}
            }
            if (data.content.header) {
                this.content.header = {
                    rows: valueOrDefault(data.content.header.rows, [])
                }
            } else {
                this.content.header = {rows: []}
            }

            if (data.content.footer) {
                this.content.footer = {
                    rows: valueOrDefault(data.content.footer.rows, [])
                }
            } else {
                this.content.footer = {rows: []}
            }

            if (data.content.trackingPixels) {
                this.content.trackingPixels = data.content.trackingPixels;
            } else {
                this.content.trackingPixels = []
            }
        } else {
            this.content = {
                title: null,
                subtitle: null,
                labels: null,
                offset: null,
                width: null,
                sidebar: null,
                scripts: [],
                styles: [],
                datasets: [],
                pages: [],
                paginate: true
            }
            this.content.css = {inline: null, external: null}
            this.content.header = {rows: []}
            this.content.footer = {rows: []}
            this.content.trackingPixels = [];
        }

        this.layout = valueOrDefault(data.layout, "vertical");
        this.formLayoutOptions = valueOrDefault(data.formLayoutOptions, {});
        this.itemLayoutOptions = data.itemLayoutOptions || {};
    }

    constructor(data: IFormProps, store: FormStore) {
        this.initialize(data, store);
    }

    @computed get isValid() : boolean {
        return this.content.pages.every((p: Page) => {
            return p.isValid;
        })
    }

    @computed get numPages() : number {
        return this.content.pages.length;
    }

    @computed get numFields() : number {
        return this.content.pages.reduce((total: number, p: Page) => {
            return total + p.numFields;
        }, 0);
    }

    @action addPage(p : Page, index?: number) {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.content.pages.splice(index, 0, p);
        } else {
            this.content.pages.push(p)
        }
    }

    @action removePage(index: number) : void {
        this.content.pages.splice(index, 1);
    }

    @action swapPages(index1: number, index2: number): void {
        let { pages } = this.content;
        [pages[index1], pages[index2]] = [pages[index2], pages[index1]];
    }

    @action movePage(atIndex: number, toIndex: number) : void {
        this.content.pages.splice(toIndex, 0, this.content.pages.splice(atIndex, 1)[0]);
    }

    @computed get isSubmittable() : boolean {
        let validTarget =  !!this.stopSubmit ?  !this.stopSubmit : true
        return this.errors.length == 0 && validTarget;
    }

    @computed get idFieldMap() : { [key:string]:Field; }  {
        return this.content.pages.reduce((all: {}, s: Page)=>{
            return {...all, ...s.idFieldMap}
        }, {});
    }

    @computed get errors() : IValidationError[] {
        return this.content.pages.reduce((all: any[], p: Page)=>{
            return all.concat(p.errors);
        }, <any[]>[]);
    }

    @computed get values() : { [key:string]: any; } {
        return Object.keys(this.idFieldMap).reduce((all: {}, uuid: string) => {
            let f: Field = this.idFieldMap[uuid];
            return {...all, [f.uuid]: f.value}
        }, {});
    }

    @action.bound handleSubmit(e: FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.store.setSubmitting(true);
        let meta = this.idFieldMap;
        let payload = {};
        let values = this.values;
        Object.keys(values).forEach((id: string) => {
            let key = meta[id].fieldOptions.valuePropName || meta[id].name;
            payload[key] = values[id];
        });

        if(this.isSubmittable && !!this.submitTarget) {
            axios.post(this.submitTarget, payload).catch((reason:any) => {
                console.log('Submit Error', reason);
                this.submitError = "There was an error submitting this form";
                if (this.successRedirect) {
                    setTimeout(()=> {
                        window.location.href = this.successRedirect;
                    }, 5000);
                }
            }).then(() => {
                this.store.setSubmitting(false);
                if (this.successRedirect) {
                    setTimeout(()=> {
                        window.location.href = this.errorRedirect;
                    }, 5000);
                }
            })
        } else {
            console.dir(values);
        }
    }
}

decorate(Form, {
    id: observable,
    exid: observable,
    desc: observable,
    name: observable,
    tenant: observable,
    status: observable,
    content:observable,
    layout: observable,
    stopSubmit: observable,
    submitTarget: observable,
    submitError: observable,
    formLayoutOptions: observable,
    itemLayoutOptions: observable
});

export default Form;