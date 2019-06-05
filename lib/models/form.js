import * as tslib_1 from "tslib";
import { action, decorate, observable, computed, toJS } from "mobx";
import axios from "axios";
import { valueOrDefault, uuid } from "./common";
class Form {
    constructor(data, store) {
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.uuid = valueOrDefault(data.uuid, uuid());
        this.exid = valueOrDefault(data.exid, null);
        this.desc = valueOrDefault(data.desc, null);
        if (data.tenant) {
            this.tenant = {
                eid: valueOrDefault(data.tenant.eid, null),
                mid: valueOrDefault(data.tenant.mid, null),
                context: valueOrDefault(data.tenant.context, null),
                stack: valueOrDefault(data.tenant.stack, null)
            };
        }
        else {
            this.tenant = { eid: null, mid: null, context: null, stack: null };
        }
        if (data.status) {
            this.status = {
                timezone: valueOrDefault(data.status.timezone, null),
                paused: valueOrDefault(data.status.paused, null),
                active: valueOrDefault(data.status.active, null),
                created: valueOrDefault(data.status.created, null),
                edited: valueOrDefault(data.status.edited, null),
                starts: valueOrDefault(data.status.starts, null),
                ends: valueOrDefault(data.status.ends, null)
            };
        }
        else {
            this.status = { timezone: null, paused: false, active: false, created: null, edited: null, starts: null, ends: null };
        }
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
        this.formLayoutOptions = valueOrDefault(data.formLayoutOptions, {});
        this.itemLayoutOptions = data.itemLayoutOptions || {};
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
        if (index) {
            this.content.pages.splice(index, 0, p);
        }
        else {
            this.content.pages.push(p);
        }
    }
    removePage(index) {
        this.content.pages.splice(index, 1);
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
            return Object.assign({}, all, s.idFieldMap);
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
            return Object.assign({}, all, { [f.id]: f.value });
        }, {});
    }
    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.store.setSubmitting(true);
        let meta = this.idFieldMap;
        let payload = {};
        let values = toJS(this.values);
        Object.keys(this.values).forEach((id) => {
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
tslib_1.__decorate([
    action
], Form.prototype, "initialize", null);
tslib_1.__decorate([
    computed
], Form.prototype, "isValid", null);
tslib_1.__decorate([
    computed
], Form.prototype, "numPages", null);
tslib_1.__decorate([
    computed
], Form.prototype, "numFields", null);
tslib_1.__decorate([
    action
], Form.prototype, "addPage", null);
tslib_1.__decorate([
    action
], Form.prototype, "removePage", null);
tslib_1.__decorate([
    action
], Form.prototype, "movePage", null);
tslib_1.__decorate([
    computed
], Form.prototype, "isSubmittable", null);
tslib_1.__decorate([
    computed
], Form.prototype, "idFieldMap", null);
tslib_1.__decorate([
    computed
], Form.prototype, "errors", null);
tslib_1.__decorate([
    computed
], Form.prototype, "values", null);
tslib_1.__decorate([
    action.bound
], Form.prototype, "handleSubmit", null);
decorate(Form, {
    id: observable,
    exid: observable,
    desc: observable,
    name: observable,
    tenant: observable,
    status: observable,
    content: observable,
    values: computed,
    layout: observable,
    stopSubmit: observable,
    submitTarget: observable,
    submitError: observable,
    formLayoutOptions: observable,
    itemLayoutOptions: observable
});
export default Form;
