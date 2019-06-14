export declare type ScreenWidth = "xs" | "sm" | "md" | "lg" | "xl";
export declare const AllScreenWidths: string[];
export interface ColSpanOffset {
    span: number;
    offset?: number;
}
export declare class LayoutOption {
    xs: ColSpanOffset;
    sm: ColSpanOffset;
    md: ColSpanOffset;
    lg: ColSpanOffset;
    xl: ColSpanOffset;
    constructor(props: {
        [key in ScreenWidth]?: ColSpanOffset;
    });
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
    labelCol?: LayoutOption;
    wrapperCol?: LayoutOption;
}
export declare class ItemLayoutOptions {
    labelAlign: "left" | "right";
    labelCol: LayoutOption;
    wrapperCol: LayoutOption;
    initialize(props: IItemLayoutOptions): void;
    constructor(props: IItemLayoutOptions);
}
