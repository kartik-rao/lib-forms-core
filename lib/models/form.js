import { __decorate } from "tslib";
import axios from "axios";
import { action, computed, observable } from "mobx";
import { valueOrDefault } from "./common";
import { FormLayoutOptions, ItemLayoutOptions } from './layout';
export class Form {
    constructor(data, store) {
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.name = data.name;
        this.uuid = data.uuid;
        this.exid = valueOrDefault(data.exid, null);
        this.description = valueOrDefault(data.description, null);
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
        let validTarget = !!this.stopSubmit ? !this.stopSubmit : true;
        return this.errors.length == 0 && validTarget;
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
    handleSubmit(e) {
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
        if (this.isSubmittable && !!this.submitTarget) {
            axios.post(this.submitTarget, payload).catch((reason) => {
                console.log('Submit Error', reason);
                this.submitError = "There was an error submitting this form";
                if (this.successRedirect) {
                    setTimeout(() => {
                        window.location.href = this.successRedirect;
                    }, 5000);
                }
            }).then(() => {
                this.store.setSubmitting(false);
                if (this.successRedirect) {
                    setTimeout(() => {
                        window.location.href = this.errorRedirect;
                    }, 5000);
                }
            });
        }
        else {
            console.dir(values);
        }
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
], Form.prototype, "stopSubmit", void 0);
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
    action.bound
], Form.prototype, "handleSubmit", null);
