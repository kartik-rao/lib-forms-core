import {action, decorate, observable, computed, toJS} from "mobx";
import axios from "axios";
import {valueOrDefault, uuid} from "./common";
import Page from "./page";
import FormStore from "../state/FormStore";

export interface IFormTenant {
    eid: number;
    mid: number;
    context: string;
    stack: string;
}

export interface IFormTransition {
    action?: string;
    textContent?: string;
    htmlContent?: string;
    redirectTo?: string;
}

export interface IFormTransitions {
    submitted?: IFormTransition
    inactive?: IFormTransition
    ended?: IFormTransition
}

export interface IFormStatus {
    timezone?: string;
    paused?: boolean;
    active?: boolean;
    created?: Date;
    edited?: Date;
    starts?: Date;
    ends?: Date;
}

export interface IFormContent {
    title?: string;
    subtitle?: string;
    labels?: string;
    offset?: string;
    width?: string;
    sidebar?: any;
    scripts?: string[];
    styles?: string[];
    datasets?: any[];
    pages?: Page[];
    paginate?: boolean;
    css?: {
        inline: string[];
        external: string[];
    }
    header? : {
        rows: any[];
    }
    footer? : {
        rows: any[];
    }
    trackingPixels?: any[];
}

export interface IFormLayoutOptions {
    showSteps?: boolean,
    showPageTitles?: boolean,
    showSectionTitles?: boolean,
    showSectionBorders? : boolean,
    showPageBorders?: boolean,
    validationDisablesPaging?: boolean,
    wrapperSpan?: number,
    wrapperOffset?: number
}

export interface IFormProps {
    id: string;
    uuid?: string;
    exid?: string;
    desc?: string;
    name?: string;
    tenant?: IFormTenant;
    status?: IFormStatus;
    content?: IFormContent;
    values?: any;
    layout?: any;
    formLayoutOptions?: IFormLayoutOptions;
    stopSubmit?: boolean;
    submitTarget?: string;
    successRedirect?: string;
    errorRedirect?: string;
}

class Form implements IFormProps {
    id: string;
    uuid: string;
    exid: string;
    desc: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    values: any;
    layout: any;
    stopSubmit: boolean;
    submitTarget: string;
    formLayoutOptions: IFormLayoutOptions;
    store: FormStore
    submitError: string;
    successRedirect: string;
    errorRedirect: string;

    @action initialize(data: IFormProps, store: FormStore) {
        this.store = store;
        this.id = data.id;
        this.uuid = valueOrDefault(data.uuid, uuid());
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
                pages: valueOrDefault(data.content.pages, []),
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
        this.values = valueOrDefault(data.values, {});
        this.layout = valueOrDefault(data.layout, "vertical");
        this.formLayoutOptions = valueOrDefault(data.formLayoutOptions, {});
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
        if (index) {
            this.content.pages.splice(index, 0, p);
        } else {
            this.content.pages.push(p)
        }
    }

    @action removePage(index: number) {
        this.content.pages.splice(index, 1);
    }

    @action movePage(atIndex: number, toIndex: number) {
        this.content.pages.splice(toIndex, 0, this.content.pages.splice(atIndex, 1)[0]);
    }

    @computed get isSubmittable() {
        let validTarget =  !!this.stopSubmit ?  !this.stopSubmit : true
        return this.errors.length == 0 && validTarget;
    }

    @computed get fieldMetadata() : any {
        return this.content.pages.reduce((all: {}, s: Page)=>{
            return {...all, ...s.fieldMetadata}
        }, {});
    }

    @computed get errors() : any[] {
        return this.content.pages.reduce((all: any[], p: Page)=>{
            return all.concat(p.errors);
        }, <any[]>[]);
    }


    @action handleSubmit() {
        this.store.setSubmitting(true);
        let meta = this.fieldMetadata;
        let payload = {};
        let values = toJS(this.store.values);
        Object.keys(this.store.values).forEach((id: string) => {
            let key = meta[id].valuePropName || meta[id].name;
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
    values: observable,
    layout: observable,
    stopSubmit: observable,
    submitTarget: observable,
    submitError: observable,
    formLayoutOptions: observable
});

export default Form;