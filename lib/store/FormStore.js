import { observable } from "mobx";
export const createFormStore = () => {
    const store = {
        errors: {},
        values: {},
        touched: {},
        currentPage: 0,
        debug: (window && window.location.hostname.indexOf('localhost') > -1) ? true : false,
        form: null,
        isReady: false,
        submitting: false,
        validationDisabled: false,
        conditionsDisabled: false,
        get idFieldMap() {
            if (!this.form) {
                return {};
            }
            return this.form.content.pages.reduce((all, p) => {
                return Object.assign(Object.assign({}, all), p.idFieldMap);
            }, {});
        },
        get uuidFieldMap() {
            if (!this.form) {
                return {};
            }
            return this.form.content.pages.reduce((all, p) => {
                return Object.assign(Object.assign({}, all), p.uuidFieldMap);
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
            this.submitting = value;
        },
        get isSubmitting() {
            return this.submitting;
        },
        get numPages() {
            return this.form ? this.form.content.pages.length : 0;
        },
        nextPage: function () {
            if (!this.form) {
                return;
            }
            let currentPage = this.form.content.pages[this.currentPage];
            let errors = currentPage.errors;
            let { validationDisablesPaging } = this.form.formLayoutOptions;
            // Highlight all errors
            currentPage.fieldIds.forEach((id) => {
                this.touched[id] = true;
            });
            if (!errors || errors.length == 0 || validationDisablesPaging == false) {
                this.currentPage = this.currentPage + 1;
            }
        },
        prevPage: function () {
            this.currentPage = this.currentPage - 1;
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
    return observable(store);
};
