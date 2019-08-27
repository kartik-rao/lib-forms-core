import * as React from "react";
import { observable, toJS } from "mobx";
import { Field } from "../models/field";
import { Form } from "../models/form";
import { Page } from "../models/page";
import { IFormProps } from '..';
import {Factory} from "../models/factory";

export const createFormStore = function(formData: IFormProps) {
    const store = {
        // factory: Factory,
        errors : observable.map({}),
        values: observable.map({}),
        touched: observable.map({}),
        currentPage: observable.box(0),
        debug : observable.box((window && window.location.hostname.indexOf('localhost') > -1) ? true : false),
        form :<Form> null,
        isReady: observable.box(false),
        submitting: observable.box(false),
        validationDisabled: observable.box(false),
        conditionsDisabled: observable.box(false),
        get idFieldMap() : { [key:string]:Field; } {
            return this.form.content.pages.reduce((all: {}, p: Page) => {
                return {...all, ...p.idFieldMap};
            }, {});
        },
        get fieldNames() : string[] {
            return this.form.content.pages.reduce((all: string[], p: Page) => {
                return all.concat(p.fieldNames);
            }, <string[]>[])
        },
        get isValid() : boolean {
            if (!this.form.content && this.form.content.pages && this.form.content.pages.length > 0) {
                return true;
            } else {
                return this.form.content.pages.every((p: Page) => {
                    return p.isValid
                })
            }
        },
        setSubmitting(value: boolean) {
            this.submitting.set(value)
        },
        get isSubmitting() : boolean {
            return this.submitting.get();
        },
        get numPages() : number {
            return this.form.content.pages.length;
        },
        nextPage : function () {
            let currentPage = this.form.content.pages[this.currentPage.get()] as Page;
            let errors = currentPage.errors;
            let {validationDisablesPaging} = this.form.formLayoutOptions;
            // Highlight all errors
            currentPage.fieldIds.forEach((id: string) => {
                this.touched[id] = true;
            });
            if (!errors || errors.length == 0||validationDisablesPaging == false) {
                this.currentPage.set(this.currentPage.get() + 1);
            }
        },
        prevPage : function() {
            this.currentPage.set(this.currentPage.get() - 1);
        },
        setForm : function (form: Form) {
            this.form = form;
        },
        setFieldValue: function (id: string, value: any) {
            this.values.set(id, value);
        },
        setFieldTouched: function (id: string) {
            this.touched.set(id, true);
        },
        setFieldError: function (id: string, error: any) {
            this.errors.set(id, error)
        }
    }
    store.form = new Factory(store).makeForm(formData);
    store.isReady.set(true);
    return store;
}

export type FormStoreType = ReturnType<typeof createFormStore>;