import { observable, action, computed } from "mobx";
import {valueOrDefault} from "./common";

export type ScreenWidth = "xs"|"sm"|"md"|"lg"|"xl";
export const AllScreenWidths: ScreenWidth[] = ["xs","sm","md","lg","xl"];

export interface ColSpanOffset {
    span: number;
    offset?: number;
}

export interface ILayoutOption {
    xs?  : ColSpanOffset;
    sm?  : ColSpanOffset;
    md?  : ColSpanOffset;
    lg?  : ColSpanOffset;
    xl?  : ColSpanOffset;
}
export class LayoutOption implements ILayoutOption {
    @observable xs  : ColSpanOffset;
    @observable sm  : ColSpanOffset;
    @observable md  : ColSpanOffset;
    @observable lg  : ColSpanOffset;
    @observable xl  : ColSpanOffset;

    constructor(props: {[key in ScreenWidth]?: ColSpanOffset}={}) {
        Object.keys(props).map((width: ScreenWidth) => {
            if(AllScreenWidths.indexOf(width) > -1 && props[width]){
                this[width] = props[width];
            }
        })
    }

    @computed get unused() : ScreenWidth[] {
        return AllScreenWidths.filter((d) => {
            return typeof this[d] == 'undefined' || this[d] == null
        })
    }

    @computed get used() : ScreenWidth[] {
        return AllScreenWidths.filter((d) => {
            return typeof this[d] != 'undefined' && this[d] != null
        })
    }

    add(dimension: ScreenWidth, colspan: ColSpanOffset) {
        this[dimension] = colspan;
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
    labelCol?: ILayoutOption;
    wrapperCol?: ILayoutOption;
}

export class ItemLayoutOptions implements IItemLayoutOptions {
    @observable labelAlign : "left"|"right";
    @observable labelCol: ILayoutOption;
    @observable wrapperCol: ILayoutOption;

    @action initialize(props: IItemLayoutOptions) {
        if(!props) {
            return;
        }
        this.labelAlign = valueOrDefault(props.labelAlign, "left");
        this.wrapperCol = new LayoutOption(props.wrapperCol);
        this.labelCol = new LayoutOption(props.labelCol);
    }

    constructor(props: IItemLayoutOptions) {
        this.initialize(props);
    }
}


// export type ColumnLayout = { [key in ScreenWidth]?: ColSpanOffset };