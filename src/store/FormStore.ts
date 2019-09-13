import { observable } from "mobx";
import { Field } from "../models/field";
import { Form } from "../models/form";
import { Page } from "../models/page";
import config from '../config';

export const createFormStore = () => {
    const store = {
        errors : {},
        values: {},
        touched: {},
        currentPage: 0,
        debug : config.debug,
        showDebug: false,
        form :<Form> null,
        isReady: false,
        submitting: false,
        validationDisabled: false,
        conditionsDisabled: false,
        preventRedirects : false,
        preventSubmit : false,
        toggleShowDebug: function () {
            this.showDebug = !this.showDebug;
        },
        get idFieldMap() : { [key:string]:Field; } {
            if (!this.form) {
                return {}
            }
            return this.form.content.pages.reduce((all: {}, p: Page) => {
                return {...all, ...p.idFieldMap};
            }, {});
        },
        get uuidFieldMap() : { [key:string]:Field; } {
            if (!this.form) {
                return {}
            }
            return this.form.content.pages.reduce((all: {}, p: Page) => {
                return {...all, ...p.uuidFieldMap};
            }, {});
        },
        get fieldNames() : string[] {
            if (!this.form) {
                return []
            }
            return this.form.content.pages.reduce((all: string[], p: Page) => {
                return all.concat(p.fieldNames);
            }, <string[]>[])
        },
        get isValid() : boolean {
            if (this.form && this.form.content && this.form.content.pages && this.form.content.pages.length > 0) {
                return this.form.content.pages.every((p: Page) => {
                    return p.isValid
                })
            } else {
                return true;
            }
        },
        setSubmitting(value: boolean) {
            this.submitting = value;
        },
        get isSubmitting() : boolean {
            return this.submitting;
        },
        get numPages() : number {
            return this.form ? this.form.content.pages.length : 0;
        },
        get hasNextPage() : boolean {
            return this.currentPage < this.numPages -1;
        },
        get hasPrevPage() : boolean {
            return this.currentPage > 0 && this.numPages > 1
        },
        get isSubmittable() : boolean {
            return this.form ? this.form.isSubmittable : false;
        },
        nextPage : function () {
            if(!this.form) {
                return;
            }
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
        },
        prevPage : function() {
            this.currentPage = this.currentPage - 1;
        },
        setForm : function (form: Form) {
            this.form = form;
        },
        setFieldValue: function (id: string, value: any) {
            this.values[id] = value;
        },
        setFieldTouched: function (id: string) {
            this.touched[id] = true;
        },
        setFieldError: function (id: string, error: any) {
            this.errors[id] = error;
        }
    }
    return observable(store);
}

export type FormStoreType = ReturnType<typeof createFormStore>;