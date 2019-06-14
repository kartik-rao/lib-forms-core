import {IPage} from "./page";
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
    pages?: IPage[];
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
    validationDisablesPaging?: boolean
}

export enum ScreenWidths {
    "xs" = "xs",
    "sm" = "sm",
    "md" = "md",
    "lg" = "lg",
    "xl" = "xl"
};

export interface ColSpanOffset {
    span: number;
    offset?: number;
}

export interface IFormItemLayoutOptions {
    labelCol?: {[key in keyof typeof ScreenWidths]?: ColSpanOffset};
    wrapperCol?: {[key in keyof typeof ScreenWidths]?: ColSpanOffset};
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
    layout?: "vertical"|"horizontal"|"inline";
    formLayoutOptions?: IFormLayoutOptions;
    itemLayoutOptions?: IFormItemLayoutOptions;
    stopSubmit?: boolean;
    submitTarget?: string;
    successRedirect?: string;
    errorRedirect?: string;
}