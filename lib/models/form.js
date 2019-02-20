var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable } from "mobx";
class Form {
    constructor(data, store) {
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.id = data.id;
        this.exid = data.exid;
        this.desc = data.desc;
        if (data.tenant) {
            this.tenant = {
                eid: data.tenant.eid,
                mid: data.tenant.mid,
                context: data.tenant.context,
                stack: data.tenant.stack
            };
        }
        if (data.status) {
            this.status = {
                timezone: data.status.timezone,
                paused: data.status.paused,
                active: data.status.active,
                created: data.status.created,
                edited: data.status.edited,
                starts: data.status.starts,
                ends: data.status.ends
            };
        }
        if (data.content) {
            this.content = {
                title: data.content.title,
                subtitle: data.content.subtitle,
                labels: data.content.labels,
                offset: data.content.offset,
                width: data.content.width,
                sidebar: data.content.sidebar,
                scripts: data.content.scripts,
                styles: data.content.styles,
                datasets: data.content.datasets,
                pages: data.content.pages,
                paginate: data.content.paginate
            };
            if (data.content.css) {
                this.content.css = {
                    inline: data.content.css.inline,
                    external: data.content.css.external
                };
            }
            if (data.content.header) {
                this.content.header = {
                    rows: data.content.header.rows
                };
            }
            if (data.content.footer) {
                this.content.footer = {
                    rows: data.content.footer.rows
                };
            }
            if (data.content.trackingPixels) {
                this.content.trackingPixels = data.content.trackingPixels;
            }
        }
        this.values = data.values;
        this.layout = data.layout;
        this.formLayoutOptions = data.formLayoutOptions;
    }
}
__decorate([
    action
], Form.prototype, "initialize", null);
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
    formLayoutOptions: observable
});
export default Form;
