import { action, computed, observable, set } from "mobx";
import { Field } from "../models/field";
import { Form } from "../models/form";
import { Page } from "../models/page";

export interface IFormStoreProps {
    values?: any;
    form?  : Form;
    debug? : boolean
}

export class FormStore {
    @observable errors: any;
    @observable values: any;
    @observable touched: any;
    @observable currentPage: number;
    @observable debug : boolean;
    @observable form: Form
    @observable submitting: boolean;
    @observable validationDisabled: boolean;
    @observable conditionsDisabled: boolean;

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
        let {validationDisablesPaging} = this.form.formLayoutOptions;
        // Highlight all errors
        currentPage.fieldIds.forEach((id: string) => {
            this.touched[id] = true;
        });
        if (!errors || errors.length == 0||validationDisablesPaging == false) {
            this.currentPage = this.currentPage + 1;
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