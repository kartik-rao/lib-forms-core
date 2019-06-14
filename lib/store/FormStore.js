import * as tslib_1 from "tslib";
import { action, computed, observable, set } from "mobx";
export class FormStore {
    constructor() {
        this.initialize();
    }
    get idFieldMap() {
        return this.form.content.pages.reduce((all, p) => {
            return Object.assign({}, all, p.idFieldMap);
        }, {});
    }
    get fieldNames() {
        return this.form.content.pages.reduce((all, p) => {
            return all.concat(p.fieldNames);
        }, []);
    }
    get isValid() {
        if (!this.form.content && this.form.content.pages && this.form.content.pages.length > 0) {
            return true;
        }
        else {
            return this.form.content.pages.every((p) => {
                return p.isValid;
            });
        }
    }
    setSubmitting(value) {
        this.submitting = value;
    }
    get isSubmitting() {
        return this.submitting;
    }
    get numPages() {
        return this.form.content.pages.length;
    }
    nextPage() {
        let currentPage = this.form.content.pages[this.currentPage];
        let errors = currentPage.errors;
        let { validationDisablesPaging } = this.form.formLayoutOptions;
        currentPage.fieldIds.forEach((id) => {
            this.touched[id] = true;
        });
        if (!errors || errors.length == 0 || validationDisablesPaging == false) {
            this.currentPage = this.currentPage + 1;
        }
    }
    prevPage() {
        this.currentPage = this.currentPage - 1;
    }
    setForm(form) {
        this.form = form;
    }
    setFieldValue(id, value) {
        set(this.values, id, value);
    }
    setFieldTouched(id) {
        set(this.touched, id, true);
    }
    setFieldError(id, error) {
        set(this.errors, id, error);
    }
    initialize() {
        this.values = {};
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = false;
        return;
    }
}
tslib_1.__decorate([
    observable
], FormStore.prototype, "errors", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "values", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "touched", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "currentPage", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "debug", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "form", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "submitting", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "validationDisabled", void 0);
tslib_1.__decorate([
    observable
], FormStore.prototype, "conditionsDisabled", void 0);
tslib_1.__decorate([
    computed
], FormStore.prototype, "idFieldMap", null);
tslib_1.__decorate([
    computed
], FormStore.prototype, "fieldNames", null);
tslib_1.__decorate([
    computed
], FormStore.prototype, "isValid", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "setSubmitting", null);
tslib_1.__decorate([
    computed
], FormStore.prototype, "isSubmitting", null);
tslib_1.__decorate([
    computed
], FormStore.prototype, "numPages", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "nextPage", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "prevPage", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "setForm", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "setFieldValue", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "setFieldTouched", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "setFieldError", null);
tslib_1.__decorate([
    action
], FormStore.prototype, "initialize", null);
