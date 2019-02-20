import {action, decorate, observable, computed} from "mobx";
// import {FormComponentProps} from "antd/lib/form";
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
    exid?: string;
    desc?: string;
    name?: string;
    tenant?: IFormTenant;
    status?: IFormStatus;
    content?: IFormContent;
    values?: any;
    layout?: any;
    formLayoutOptions?: IFormLayoutOptions;
}

class Form implements IFormProps {
    id: string;
    exid: string;
    desc: string;
    name: string;
    tenant: IFormTenant;
    status: IFormStatus;
    content: IFormContent;
    values: any;
    layout: any;
    formLayoutOptions: IFormLayoutOptions;

    @action initialize(data: IFormProps, store: FormStore) {
        this.id = data.id;
        this.exid = data.exid;
        this.desc = data.desc;
        if (data.tenant) {
            this.tenant = {
                eid: data.tenant.eid,
                mid: data.tenant.mid,
                context: data.tenant.context,
                stack: data.tenant.stack
            }
        }

        if (data.status) {
            this.status = {
                timezone: data.status.timezone,
                paused: data.status.paused,
                active: data.status.active,
                created: data.status.created,
                edited: data.status.edited,
                starts: data.status.starts,
                ends: data.status.ends
            }
        }

        if (data.content) {
            this.content = {
                title: data.content.title,
                subtitle: data.content.subtitle,
                labels: data.content.labels,
                offset: data.content.offset,
                width: data.content.width,
                sidebar: data.content.sidebar,
                scripts: data.content.scripts,
                styles: data.content.styles,
                datasets: data.content.datasets,
                pages: data.content.pages,
                paginate: data.content.paginate
            }
            if (data.content.css) {
                this.content.css = {
                    inline : data.content.css.inline,
                    external: data.content.css.external
                }
            }
            if (data.content.header) {
                this.content.header = {
                    rows: data.content.header.rows
                }
            }

            if (data.content.footer) {
                this.content.footer = {
                    rows: data.content.footer.rows
                }
            }

            if (data.content.trackingPixels) {
                this.content.trackingPixels = data.content.trackingPixels;
            }
        }
        this.values = data.values;
        this.layout = data.layout;
        this.formLayoutOptions = data.formLayoutOptions;
    }

    constructor(data: IFormProps, store: FormStore) {
        this.initialize(data, store);
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
    formLayoutOptions: observable
});

export default Form;