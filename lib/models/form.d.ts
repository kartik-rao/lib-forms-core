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
    submitted?: IFormTransition;
    inactive?: IFormTransition;
    ended?: IFormTransition;
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
    };
    header?: {
        rows: any[];
    };
    footer?: {
        rows: any[];
    };
    trackingPixels?: any[];
}
export interface IFormLayoutOptions {
    showSteps?: boolean;
    showPageTitles?: boolean;
    showSectionTitles?: boolean;
    showSectionBorders?: boolean;
    showPageBorders?: boolean;
    validationDisablesPaging?: boolean;
    wrapperSpan?: number;
    wrapperOffset?: number;
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
declare class Form implements IFormProps {
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
    store: FormStore;
    submitError: string;
    successRedirect: string;
    errorRedirect: string;
    initialize(data: IFormProps, store: FormStore): void;
    constructor(data: IFormProps, store: FormStore);
    readonly isValid: boolean;
    readonly numPages: number;
    readonly numFields: number;
    addPage(p: Page, index?: number): void;
    removePage(index: number): void;
    movePage(atIndex: number, toIndex: number): void;
    readonly isSubmittable: boolean;
    readonly fieldMetadata: any;
    readonly errors: any[];
    handleSubmit(): void;
}
export default Form;
