import axios from "axios";
import { action, computed, observable, toJS } from "mobx";
import { FormEvent } from "react";
import { FormStoreType } from "../store/FormStore";
import { valueOrDefault } from "./common";
import { Field } from "./field";
import { IFormContent, IFormProps, IFormStatus, IFormTenant } from "./form.properties";
import { FormLayoutOptions, ItemLayoutOptions } from './layout';
import {Page} from "./page";
import { IValidationError } from "./validation";


export class Form implements IFormProps {
    store: FormStoreType
    uuid: string;

    @observable id: string;
    @observable exid: string;
    @observable description: string;
    @observable name: string;
    @observable tenant: IFormTenant;
    @observable status: IFormStatus;
    @observable content: IFormContent;
    @observable layout: any;
    @observable stopSubmit: boolean;
    @observable submitTarget: string;
    @observable submitError: string;
    @observable formLayoutOptions: FormLayoutOptions;
    @observable itemLayoutOptions: ItemLayoutOptions;
    @observable successRedirect: string;
    @observable errorRedirect: string;

    @action initialize(data: IFormProps, store: FormStoreType) {
        this.store = store;
        this.id = data.id;
        this.name = data.name;
        this.uuid = data.uuid;
        this.exid = valueOrDefault(data.exid, null);
        this.description = valueOrDefault(data.description, null);

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
        this.formLayoutOptions = new FormLayoutOptions(data.formLayoutOptions);
        this.itemLayoutOptions = new ItemLayoutOptions(data.itemLayoutOptions);
    }

    constructor(data: IFormProps, store: FormStoreType) {
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

    @computed get uuidFieldMap() : { [key:string]:Field; }  {
        return this.content.pages.reduce((all: {}, s: Page)=>{
            return {...all, ...s.uuidFieldMap}
        }, {});
    }

    @computed get errors() : IValidationError[] {
        return this.content.pages.reduce((all: any[], p: Page)=>{
            return all.concat(p.errors);
        }, <any[]>[]);
    }

    @computed get values() : { [key:string]: any; } {
        return Object.keys(this.idFieldMap).reduce((all: {}, id: string) => {
            let f: Field = this.idFieldMap[id];
            // HTMLFragment and TextBlock have no value
            if (f.inputType ==  'htmlfragment' || f.inputType == 'textblock') {
                return all;
            }
            return {...all, [f.id]: f.value}
        }, {});
    }

    @computed get asPlainObject() {
        let clone : IFormProps = {
            id: this.id,
            name: this.name,
            uuid: this.uuid,
            exid: this.exid,
            description: this.description,
        }

        if (this.content) {
            clone.content = {
                title : this.content.title,
                subtitle : this.content.subtitle,
                labels : this.content.labels,
                offset : this.content.offset,
                width : this.content.width,
                sidebar : this.content.sidebar,
                scripts : this.content.scripts,
                styles : this.content.styles,
                datasets : this.content.datasets,
                paginate : this.content.paginate,
                pages : this.content.pages ? (this.content.pages as Page[]).map((p) => {return p.asPlainObject}) : []
            }
        }

        clone.layout = this.layout;
        clone.formLayoutOptions = this.formLayoutOptions;
        clone.itemLayoutOptions = this.itemLayoutOptions;
        clone.submitTarget = this.submitTarget;
        clone.errorRedirect = this.errorRedirect;
        clone.successRedirect = this.successRedirect;
        return clone;
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