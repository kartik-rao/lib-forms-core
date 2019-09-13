import { __awaiter, __decorate } from "tslib";
import axios from "axios";
import { action, computed, observable, toJS } from "mobx";
import { valueOrDefault } from "./common";
import { FormLayoutOptions, ItemLayoutOptions } from './layout';
export var SubmitState;
(function (SubmitState) {
    SubmitState["NOT_SUBMITTED"] = "Not Submitted";
    SubmitState["SUBMITTING"] = "Submitting";
    SubmitState["SUCCESS"] = "Success";
    SubmitState["ERROR"] = "Error";
})(SubmitState || (SubmitState = {}));
export var SubmitResultType;
(function (SubmitResultType) {
    SubmitResultType["AWAITING_SUBMIT"] = "Awaiting Submit";
    SubmitResultType["SUCCESS_REDIRECT"] = "Success Redirect";
    SubmitResultType["ERROR_REDIRECT"] = "Error Redirect";
    SubmitResultType["DEFAULT_SUCCESS_MESSAGE"] = "Default Success Message";
    SubmitResultType["DEFAULT_ERROR_MESSAGE"] = "Default Error Message";
    SubmitResultType["USER_SUCCESS_MESSAGE"] = "User Success Message";
    SubmitResultType["USER_ERROR_MESSAGE"] = "User Error Message";
})(SubmitResultType || (SubmitResultType = {}));
export class Form {
    constructor(data, store) {
        this.submitState = SubmitState.NOT_SUBMITTED;
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.name = data.name;
        this.uuid = data.uuid;
        this.exid = valueOrDefault(data.exid, null);
        this.description = valueOrDefault(data.description, null);
        this.submitTarget = data.submitTarget;
        this.successRedirect = data.successRedirect;
        this.errorRedirect = data.errorRedirect;
        this.submitErrorMessage = data.submitErrorMessage;
        this.submitSuccessMessage = data.submitErrorMessage;
        if (data.content) {
            this.content = {
                title: valueOrDefault(data.content.title, null),
                subtitle: valueOrDefault(data.content.subtitle, null),
                labels: valueOrDefault(data.content.labels, null),
                offset: valueOrDefault(data.content.offset, null),
                width: valueOrDefault(data.content.width, null),
                sidebar: valueOrDefault(data.content.sidebar, null),
                scripts: valueOrDefault(data.content.scripts, null),
                styles: valueOrDefault(data.content.styles, null),
                datasets: valueOrDefault(data.content.datasets, null),
                pages: valueOrDefault(data.content.pages, []),
                paginate: valueOrDefault(data.content.paginate, false)
            };
            if (data.content.css) {
                this.content.css = {
                    inline: valueOrDefault(data.content.css.inline, []),
                    external: valueOrDefault(data.content.css.external, [])
                };
            }
            else {
                this.content.css = { inline: null, external: null };
            }
            if (data.content.header) {
                this.content.header = {
                    rows: valueOrDefault(data.content.header.rows, [])
                };
            }
            else {
                this.content.header = { rows: [] };
            }
            if (data.content.footer) {
                this.content.footer = {
                    rows: valueOrDefault(data.content.footer.rows, [])
                };
            }
            else {
                this.content.footer = { rows: [] };
            }
            if (data.content.trackingPixels) {
                this.content.trackingPixels = data.content.trackingPixels;
            }
            else {
                this.content.trackingPixels = [];
            }
        }
        else {
            this.content = {
                title: null,
                subtitle: null,
                labels: null,
                offset: null,
                width: null,
                sidebar: null,
                scripts: [],
                styles: [],
                datasets: [],
                pages: [],
                paginate: true
            };
            this.content.css = { inline: null, external: null };
            this.content.header = { rows: [] };
            this.content.footer = { rows: [] };
            this.content.trackingPixels = [];
        }
        this.layout = valueOrDefault(data.layout, "vertical");
        this.formLayoutOptions = new FormLayoutOptions(data.formLayoutOptions);
        this.itemLayoutOptions = new ItemLayoutOptions(data.itemLayoutOptions);
    }
    get isValid() {
        return this.content.pages.every((p) => {
            return p.isValid;
        });
    }
    get numPages() {
        return this.content.pages.length;
    }
    get numFields() {
        return this.content.pages.reduce((total, p) => {
            return total + p.numFields;
        }, 0);
    }
    addPage(p, index) {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.content.pages.splice(index, 0, p);
        }
        else {
            this.content.pages.push(p);
        }
    }
    removePage(index) {
        this.content.pages.splice(index, 1);
    }
    swapPages(index1, index2) {
        let { pages } = this.content;
        [pages[index1], pages[index2]] = [pages[index2], pages[index1]];
    }
    movePage(atIndex, toIndex) {
        this.content.pages.splice(toIndex, 0, this.content.pages.splice(atIndex, 1)[0]);
    }
    get isSubmittable() {
        if (this.store.preventSubmit) {
            return false;
        }
        let validSubmitState = this.submitState == SubmitState.ERROR || this.submitState == SubmitState.NOT_SUBMITTED;
        return validSubmitState && !!this.submitTarget && this.errors.length == 0;
    }
    get idFieldMap() {
        return this.content.pages.reduce((all, s) => {
            return Object.assign(Object.assign({}, all), s.idFieldMap);
        }, {});
    }
    get uuidFieldMap() {
        return this.content.pages.reduce((all, s) => {
            return Object.assign(Object.assign({}, all), s.uuidFieldMap);
        }, {});
    }
    get errors() {
        return this.content.pages.reduce((all, p) => {
            return all.concat(p.errors);
        }, []);
    }
    get values() {
        return Object.keys(this.idFieldMap).reduce((all, id) => {
            let f = this.idFieldMap[id];
            // HTMLFragment and TextBlock have no value
            if (f.inputType == 'htmlfragment' || f.inputType == 'textblock') {
                return all;
            }
            return Object.assign(Object.assign({}, all), { [f.id]: f.value });
        }, {});
    }
    get asPlainObject() {
        let clone = toJS({
            id: this.id,
            name: this.name,
            uuid: this.uuid,
            exid: this.exid,
            description: this.description,
            layout: this.layout,
            formLayoutOptions: this.formLayoutOptions,
            itemLayoutOptions: this.itemLayoutOptions,
            submitTarget: this.submitTarget,
            errorRedirect: this.errorRedirect,
            successRedirect: this.successRedirect,
            submitErrorMessage: this.submitErrorMessage,
            submitSuccessMessage: this.submitErrorMessage
        }, { detectCycles: true, recurseEverything: true });
        if (this.content) {
            clone.content = Object.assign(Object.assign({}, toJS({
                title: this.content.title,
                subtitle: this.content.subtitle,
                labels: this.content.labels,
                offset: this.content.offset,
                width: this.content.width,
                sidebar: this.content.sidebar,
                scripts: this.content.scripts,
                styles: this.content.styles,
                datasets: this.content.datasets,
                paginate: this.content.paginate
            }, { detectCycles: true, recurseEverything: true })), { pages: this.content.pages ? this.content.pages.map((p) => { return p.asPlainObject; }) : [] });
        }
        return clone;
    }
    get submitResultType() {
        if (this.submitState == SubmitState.NOT_SUBMITTED || this.submitState == SubmitState.SUBMITTING) {
            return SubmitResultType.AWAITING_SUBMIT;
        }
        if (this.submitState == SubmitState.SUCCESS) {
            return this.submitSuccessMessage ? SubmitResultType.USER_SUCCESS_MESSAGE : SubmitResultType.DEFAULT_SUCCESS_MESSAGE;
        }
        else {
            return this.submitErrorMessage ? SubmitResultType.USER_ERROR_MESSAGE : SubmitResultType.DEFAULT_ERROR_MESSAGE;
        }
    }
    handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            this.store.setSubmitting(true);
            let meta = this.idFieldMap;
            let payload = {};
            let values = this.values;
            Object.keys(values).forEach((id) => {
                let key = meta[id].fieldOptions.valuePropName || meta[id].name;
                payload[key] = values[id];
            });
            let self = this;
            if (this.isSubmittable && !!this.submitTarget) {
                self.submitState = SubmitState.SUBMITTING;
                try {
                    yield axios.post(self.submitTarget, payload);
                    if (!self.store.preventRedirects && self.successRedirect) {
                        window.location.href = self.successRedirect;
                    }
                    else {
                        self.submitState = SubmitState.SUCCESS;
                        self.submitError = null;
                    }
                }
                catch (error) {
                    if (!self.store.preventRedirects && self.errorRedirect) {
                        window.location.href = self.errorRedirect;
                    }
                    else {
                        self.submitState = SubmitState.ERROR;
                        self.submitError = error;
                    }
                }
            }
        });
    }
}
__decorate([
    observable
], Form.prototype, "id", void 0);
__decorate([
    observable
], Form.prototype, "exid", void 0);
__decorate([
    observable
], Form.prototype, "description", void 0);
__decorate([
    observable
], Form.prototype, "name", void 0);
__decorate([
    observable
], Form.prototype, "tenant", void 0);
__decorate([
    observable
], Form.prototype, "status", void 0);
__decorate([
    observable
], Form.prototype, "content", void 0);
__decorate([
    observable
], Form.prototype, "layout", void 0);
__decorate([
    observable
], Form.prototype, "submitTarget", void 0);
__decorate([
    observable
], Form.prototype, "submitError", void 0);
__decorate([
    observable
], Form.prototype, "formLayoutOptions", void 0);
__decorate([
    observable
], Form.prototype, "itemLayoutOptions", void 0);
__decorate([
    observable
], Form.prototype, "successRedirect", void 0);
__decorate([
    observable
], Form.prototype, "errorRedirect", void 0);
__decorate([
    observable
], Form.prototype, "submitSuccessMessage", void 0);
__decorate([
    observable
], Form.prototype, "submitErrorMessage", void 0);
__decorate([
    observable
], Form.prototype, "submitState", void 0);
__decorate([
    action
], Form.prototype, "initialize", null);
__decorate([
    computed
], Form.prototype, "isValid", null);
__decorate([
    computed
], Form.prototype, "numPages", null);
__decorate([
    computed
], Form.prototype, "numFields", null);
__decorate([
    action
], Form.prototype, "addPage", null);
__decorate([
    action
], Form.prototype, "removePage", null);
__decorate([
    action
], Form.prototype, "swapPages", null);
__decorate([
    action
], Form.prototype, "movePage", null);
__decorate([
    computed
], Form.prototype, "isSubmittable", null);
__decorate([
    computed
], Form.prototype, "idFieldMap", null);
__decorate([
    computed
], Form.prototype, "uuidFieldMap", null);
__decorate([
    computed
], Form.prototype, "errors", null);
__decorate([
    computed
], Form.prototype, "values", null);
__decorate([
    computed
], Form.prototype, "asPlainObject", null);
__decorate([
    computed
], Form.prototype, "submitResultType", null);
__decorate([
    action.bound
], Form.prototype, "handleSubmit", null);
