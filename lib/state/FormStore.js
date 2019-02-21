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
    addField(page, section, column) {
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
        this.values = data.values;
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = !!data.debug ? data.debug : false;
        return;
    }
}
__decorate([
    action
], FormStore.prototype, "addField", null);
__decorate([
    computed
], FormStore.prototype, "isValid", null);
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
    currentPage: observable
});
export default FormStore;
