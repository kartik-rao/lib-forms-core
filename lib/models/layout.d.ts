export declare type ScreenWidth = "xs" | "sm" | "md" | "lg" | "xl";
export declare const AllScreenWidths: ScreenWidth[];
export interface ColSpanOffset {
    span: number;
    offset?: number;
}
export interface ILayoutOption {
    xs?: ColSpanOffset;
    sm?: ColSpanOffset;
    md?: ColSpanOffset;
    lg?: ColSpanOffset;
    xl?: ColSpanOffset;
}
export declare class LayoutOption implements ILayoutOption {
    xs: ColSpanOffset;
    sm: ColSpanOffset;
    md: ColSpanOffset;
    lg: ColSpanOffset;
    xl: ColSpanOffset;
    constructor(props?: {
        [key in ScreenWidth]?: ColSpanOffset;
    });
    readonly unused: ScreenWidth[];
    readonly used: ScreenWidth[];
    add(dimension: ScreenWidth, colspan: ColSpanOffset): void;
}
export interface IFormLayoutOptions {
    showSteps?: boolean;
    showPageTitles?: boolean;
    showSectionTitles?: boolean;
    showSectionBorders?: boolean;
    showPageBorders?: boolean;
    validationDisablesPaging?: boolean;
    labelAlign?: "left" | "right";
    wrapperCol?: ColSpanOffset;
    labelCol?: ColSpanOffset;
}
export declare class FormLayoutOptions implements IFormLayoutOptions {
    showSteps: boolean;
    showPageTitles: boolean;
    showSectionTitles: boolean;
    showSectionBorders: boolean;
    showPageBorders: boolean;
    validationDisablesPaging: boolean;
    labelAlign: "left" | "right";
    wrapperCol: ColSpanOffset;
    labelCol: ColSpanOffset;
    constructor(props: IFormLayoutOptions);
    initialize(props: IFormLayoutOptions): void;
}
export interface IItemLayoutOptions {
    labelAlign?: "left" | "right";
    labelCol?: ILayoutOption;
    wrapperCol?: ILayoutOption;
}
export declare class ItemLayoutOptions implements IItemLayoutOptions {
    labelAlign: "left" | "right";
    labelCol: LayoutOption;
    wrapperCol: LayoutOption;
    initialize(props: IItemLayoutOptions): void;
    constructor(props: IItemLayoutOptions);
}
