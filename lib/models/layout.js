import * as tslib_1 from "tslib";
import { observable, action } from "mobx";
import { valueOrDefault } from "./common";
export const AllScreenWidths = ["xs", "sm", "md", "lg", "xl"];
export class LayoutOption {
    constructor(props) {
        Object.keys(props).map((width) => {
            this[width] = props[width];
        });
    }
}
tslib_1.__decorate([
    observable
], LayoutOption.prototype, "xs", void 0);
tslib_1.__decorate([
    observable
], LayoutOption.prototype, "sm", void 0);
tslib_1.__decorate([
    observable
], LayoutOption.prototype, "md", void 0);
tslib_1.__decorate([
    observable
], LayoutOption.prototype, "lg", void 0);
tslib_1.__decorate([
    observable
], LayoutOption.prototype, "xl", void 0);
export class FormLayoutOptions {
    constructor(props) {
        this.initialize(props);
    }
    initialize(props) {
        if (!props) {
            return;
        }
        this.showSteps = valueOrDefault(props.showSteps, true);
        this.showPageTitles = valueOrDefault(props.showPageTitles, true);
        this.showSectionTitles = valueOrDefault(props.showSectionTitles, false);
        this.showSectionBorders = valueOrDefault(props.showSectionBorders, false);
        this.showPageBorders = valueOrDefault(props.showPageBorders, false);
        this.validationDisablesPaging = valueOrDefault(props.validationDisablesPaging, true);
        this.labelAlign = valueOrDefault(props.labelAlign, "left");
        this.wrapperCol = valueOrDefault(props.wrapperCol, { span: 8 });
        this.labelCol = valueOrDefault(props.labelCol, { span: 6 });
    }
}
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "showSteps", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "showPageTitles", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "showSectionTitles", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "showSectionBorders", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "showPageBorders", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "validationDisablesPaging", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "labelAlign", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "wrapperCol", void 0);
tslib_1.__decorate([
    observable
], FormLayoutOptions.prototype, "labelCol", void 0);
tslib_1.__decorate([
    action
], FormLayoutOptions.prototype, "initialize", null);
export class ItemLayoutOptions {
    constructor(props) {
        this.initialize(props);
    }
    initialize(props) {
        if (!props) {
            return;
        }
        this.labelAlign = valueOrDefault(props.labelAlign, "left");
        this.wrapperCol = valueOrDefault(props.wrapperCol, null);
        this.labelCol = valueOrDefault(props.labelCol, null);
    }
}
tslib_1.__decorate([
    action
], ItemLayoutOptions.prototype, "initialize", null);