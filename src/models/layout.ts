import { observable, action } from "mobx";
import {valueOrDefault} from "./common";

export type ScreenWidth = "xs"|"sm"|"md"|"lg"|"xl";
export const AllScreenWidths: string[] = ["xs","sm","md","lg","xl"];

export interface ColSpanOffset {
    span: number;
    offset?: number;
}

export class LayoutOption {
    @observable xs  : ColSpanOffset;
    @observable sm  : ColSpanOffset;
    @observable md  : ColSpanOffset;
    @observable lg  : ColSpanOffset;
    @observable xl  : ColSpanOffset;

    constructor(props: {[key in ScreenWidth]?: ColSpanOffset}) {
        Object.keys(props).map((width) => {
            this[width] = props[width];
        })
    }
}

export interface IFormLayoutOptions {
    showSteps?: boolean,
    showPageTitles?: boolean,
    showSectionTitles?: boolean,
    showSectionBorders? : boolean,
    showPageBorders?: boolean,
    validationDisablesPaging?: boolean;
    labelAlign?: "left" | "right";
    wrapperCol?: ColSpanOffset;
    labelCol?: ColSpanOffset;
}

export class FormLayoutOptions implements IFormLayoutOptions {
    @observable showSteps: boolean;
    @observable showPageTitles: boolean
    @observable showSectionTitles: boolean
    @observable showSectionBorders : boolean
    @observable showPageBorders: boolean
    @observable validationDisablesPaging: boolean
    @observable labelAlign: "left" | "right"
    @observable wrapperCol: ColSpanOffset
    @observable labelCol: ColSpanOffset

    constructor(props: IFormLayoutOptions) {
        this.initialize(props);
    }

    @action initialize(props: IFormLayoutOptions) {
        if(!props) {
            return;
        }
        this.showSteps = valueOrDefault(props.showSteps, true);
        this.showPageTitles = valueOrDefault(props.showPageTitles, true);
        this.showSectionTitles = valueOrDefault(props.showSectionTitles, false);
        this.showSectionBorders = valueOrDefault(props.showSectionBorders, false);
        this.showPageBorders = valueOrDefault(props.showPageBorders, false);
        this.validationDisablesPaging = valueOrDefault(props.validationDisablesPaging, true);
        this.labelAlign = valueOrDefault(props.labelAlign, "left");
        this.wrapperCol = valueOrDefault(props.wrapperCol, {span: 8});
        this.labelCol = valueOrDefault(props.labelCol, {span: 6});
    }
}

export interface IItemLayoutOptions {
    labelAlign? : "left"|"right";
    labelCol?: LayoutOption;
    wrapperCol?: LayoutOption;
}

export class ItemLayoutOptions {
    labelAlign : "left"|"right";
    labelCol: LayoutOption;
    wrapperCol: LayoutOption;

    @action initialize(props: IItemLayoutOptions) {
        if(!props) {
            return;
        }
        this.labelAlign = valueOrDefault(props.labelAlign, "left");
        this.wrapperCol = valueOrDefault(props.wrapperCol, null);
        this.labelCol = valueOrDefault(props.labelCol, null);
    }

    constructor(props: IItemLayoutOptions) {
        this.initialize(props);
    }
}