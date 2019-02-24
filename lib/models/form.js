var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        this.values = valueOrDefault(data.values, {});
        this.layout = valueOrDefault(data.layout, "vertical");
        this.formLayoutOptions = valueOrDefault(data.formLayoutOptions, {});
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
        let validTarget = !!this.stopSubmit ? !this.stopSubmit && !!this.submitTarget : !!this.submitTarget;
        return this.errors.length == 0 && validTarget;
    }
    get fieldMetadata() {
        return this.content.pages.reduce((all, s) => {
            return Object.assign({}, all, s.fieldMetadata);
        }, {});
    }
    get errors() {
        return this.content.pages.reduce((all, p) => {
            return all.concat(p.errors);
        }, []);
    }
    handleSubmit() {
        if (this.isSubmittable) {
            this.store.setSubmitting(true);
            let meta = this.fieldMetadata;
            let payload = {};
            let values = toJS(this.store.values);
            Object.keys(this.store.values).forEach((id) => {
                let key = meta[id].valuePropName || meta[id].name;
                payload[key] = values[id];
            });
            axios.post(this.submitTarget, payload).catch((reason) => {
                console.log('Submit Error', reason);
                this.submitError = "There was an error submitting this form";
            }).then(() => {
            }).finally(() => {
                this.store.setSubmitting(false);
            });
        }
    }
}
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
], Form.prototype, "movePage", null);
__decorate([
    computed
], Form.prototype, "isSubmittable", null);
__decorate([
    computed
], Form.prototype, "fieldMetadata", null);
__decorate([
    computed
], Form.prototype, "errors", null);
__decorate([
    action
], Form.prototype, "handleSubmit", null);
decorate(Form, {
    id: observable,
    exid: observable,
    desc: observable,
    name: observable,
    tenant: observable,
    status: observable,
    content: observable,
    values: observable,
    layout: observable,
    stopSubmit: observable,
    submitTarget: observable,
    submitError: observable,
    formLayoutOptions: observable
});
export default Form;
