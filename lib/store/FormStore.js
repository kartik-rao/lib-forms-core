import { observable } from "mobx";
export const createFormStore = (formData) => {
    const store = {
        errors: observable({}),
        values: observable({}),
        touched: observable({}),
        currentPage: observable.box(0),
        debug: observable.box((window && window.location.hostname.indexOf('localhost') > -1) ? true : false),
        form: null,
        isReady: observable.box(false),
        submitting: observable.box(false),
        validationDisabled: observable.box(false),
        conditionsDisabled: observable.box(false),
        get idFieldMap() {
            if (!this.form) {
                return {};
            }
            return this.form.content.pages.reduce((all, p) => {
                return Object.assign({}, all, p.idFieldMap);
            }, {});
        },
        get uuidFieldMap() {
            if (!this.form) {
                return {};
            }
            return this.form.content.pages.reduce((all, p) => {
                return Object.assign({}, all, p.uuidFieldMap);
            }, {});
        },
        get fieldNames() {
            if (!this.form) {
                return [];
            }
            return this.form.content.pages.reduce((all, p) => {
                return all.concat(p.fieldNames);
            }, []);
        },
        get isValid() {
            if (this.form && this.form.content && this.form.content.pages && this.form.content.pages.length > 0) {
                return this.form.content.pages.every((p) => {
                    return p.isValid;
                });
            }
            else {
                return true;
            }
        },
        setSubmitting(value) {
            this.submitting.set(value);
        },
        get isSubmitting() {
            return this.submitting.get();
        },
        get numPages() {
            return this.form ? this.form.content.pages.length : 0;
        },
        nextPage: function () {
            let currentPage = this.form.content.pages[this.currentPage.get()];
            let errors = currentPage.errors;
            let { validationDisablesPaging } = this.form.formLayoutOptions;
            // Highlight all errors
            currentPage.fieldIds.forEach((id) => {
                this.touched[id] = true;
            });
            if (!errors || errors.length == 0 || validationDisablesPaging == false) {
                this.currentPage.set(this.currentPage.get() + 1);
            }
        },
        prevPage: function () {
            this.currentPage.set(this.currentPage.get() - 1);
        },
        setForm: function (form) {
            this.form = form;
        },
        setFieldValue: function (id, value) {
            this.values[id] = value;
        },
        setFieldTouched: function (id) {
            this.touched[id] = true;
        },
        setFieldError: function (id, error) {
            this.errors[id] = error;
        }
    };
    return store;
};
