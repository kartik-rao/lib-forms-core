import {action, decorate, observable, computed, set} from "mobx";
import Form from "../models/form";
import Page from "../models/page";

class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug : boolean;
    form: Form
    submitting: boolean;

    @action addField(page: number, section: number, column : number) {

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

    }

    @action prevPage() {

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

    @action initialize(data: any) {
        this.form = data.form;
        this.values = data.values;
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = !!data.debug ? data.debug : false;
        return;
    }

    constructor(data: any) {
        this.initialize(data);
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