import {action, decorate, observable, computed, set} from "mobx";
import Form from "../models/form";
import Page from "../models/page";
import Field from "../models/field";

export interface IFormStoreProps {
    values?: any;
    form?  : Form;
    debug? : boolean
}

class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug : boolean;
    form: Form
    submitting: boolean;
    validationDisabled: boolean;
    conditionsDisabled: boolean;

    @computed get idFieldMap() : { [key:string]:Field; } {
        return this.form.content.pages.reduce((all: {}, p: Page) => {
            return {...all, ...p.idFieldMap};
        }, {});
    }

    @computed get fieldNames() : string[] {
        return this.form.content.pages.reduce((all: string[], p: Page) => {
            return all.concat(p.fieldNames);
        }, <string[]>[])
    }

    @computed get isValid() : boolean {
        if (!this.form.content && this.form.content.pages && this.form.content.pages.length > 0) {
            return true;
        } else {
            return this.form.content.pages.every((p: Page) => {
                return p.isValid
            })
        }
    }

    @action setSubmitting(value: boolean) {
        this.submitting = value;
    }

    @computed get isSubmitting() {
        return this.submitting;
    }

    @computed get numPages() : number {
        return this.form.content.pages.length;
    }

    @action nextPage() {
        let currentPage = this.form.content.pages[this.currentPage] as Page;
        let errors = currentPage.errors;
        if (!errors || errors.length == 0) {
            this.currentPage = this.currentPage + 1;
        } else {
            // Highlight all errors
            currentPage.fieldIds.forEach((id: string) => {
                this.touched[id] = true;
            })
        }
    }

    @action prevPage() {
        this.currentPage = this.currentPage - 1;
    }

    @action setForm(form: Form) {
        this.form = form;
    }

    @action setFieldValue(id: string, value: any) {
        set(this.values, id, value);
    }

    @action setFieldTouched(id: string) {
        set(this.touched, id, true);
    }

    @action setFieldError(id: string, error: any) {
        set(this.errors, id, error);
    }

    @action initialize() {
        this.values = {};
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = false;
        return;
    }

    constructor() {
        this.initialize();
    }
}

decorate(FormStore, {
    errors: observable,
    values: observable,
    touched: observable,
    form: observable,
    currentPage: observable,
    submitting: observable
})

export default FormStore;