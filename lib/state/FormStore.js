var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed, set } from "mobx";
class FormStore {
    constructor(data) {
        this.initialize(data);
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
        if (!errors || errors.length == 0) {
            this.currentPage = this.currentPage + 1;
        }
        else {
            currentPage.fieldIds.forEach((id) => {
                this.touched[id] = true;
            });
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
    initialize(data) {
        this.form = data.form;
        this.values = data.values || {};
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = !!data.debug ? data.debug : false;
        return;
    }
}
__decorate([
    computed
], FormStore.prototype, "fieldNames", null);
__decorate([
    computed
], FormStore.prototype, "isValid", null);
__decorate([
    action
], FormStore.prototype, "setSubmitting", null);
__decorate([
    computed
], FormStore.prototype, "isSubmitting", null);
__decorate([
    computed
], FormStore.prototype, "numPages", null);
__decorate([
    action
], FormStore.prototype, "nextPage", null);
__decorate([
    action
], FormStore.prototype, "prevPage", null);
__decorate([
    action
], FormStore.prototype, "setForm", null);
__decorate([
    action
], FormStore.prototype, "setFieldValue", null);
__decorate([
    action
], FormStore.prototype, "setFieldTouched", null);
__decorate([
    action
], FormStore.prototype, "setFieldError", null);
__decorate([
    action
], FormStore.prototype, "initialize", null);
decorate(FormStore, {
    errors: observable,
    values: observable,
    touched: observable,
    form: observable,
    currentPage: observable,
    submitting: observable
});
export default FormStore;
