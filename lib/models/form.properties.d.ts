import { IPage } from "./page";
import { IFormLayoutOptions, IItemLayoutOptions } from "./layout";
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
    pages?: IPage[];
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
export interface IFormProps {
    id: string;
    uuid?: string;
    exid?: string;
    description?: string;
    name?: string;
    content?: IFormContent;
    values?: any;
    layout?: "vertical" | "horizontal" | "inline";
    formLayoutOptions?: IFormLayoutOptions;
    itemLayoutOptions?: IItemLayoutOptions;
    stopSubmit?: boolean;
    submitTarget?: string;
    submitSuccessMessage?: string;
    submitErrorMessage?: string;
    successRedirect?: string;
    errorRedirect?: string;
}
