import * as tslib_1 from "tslib";
import { action, decorate, observable, computed } from "mobx";
import { valueOrDefault } from "./common";
class Page {
    constructor(data, store) {
        this._type = "Page";
        this.initialize(data, store);
    }
    get fieldNames() {
        let fieldNames = [];
        if (!this.sections || this.sections.length == 0) {
            return fieldNames;
        }
        this.sections.forEach((section) => {
            if (section.columns && section.columns.length > 0) {
                section.columns.forEach((column) => {
                    if (column.fields) {
                        column.fields.forEach((field) => {
                            fieldNames.push(field.name);
                        });
                    }
                });
            }
        });
        return fieldNames;
    }
    get fieldIds() {
        let fieldIds = [];
        if (!this.sections || this.sections.length == 0) {
            return fieldIds;
        }
        this.sections.forEach((section) => {
            if (section.columns && section.columns.length > 0) {
                section.columns.forEach((column) => {
                    if (column.fields) {
                        column.fields.forEach((field) => {
                            fieldIds.push(field.id);
                        });
                    }
                });
            }
        });
        return fieldIds;
    }
    get idFieldMap() {
        return this.sections.reduce((all, s) => {
            return Object.assign({}, all, s.idFieldMap);
        }, {});
    }
    get errors() {
        return this.sections.reduce((all, s) => {
            return all.concat(s.errors);
        }, []);
    }
    get isValid() {
        return this.sections.every((s) => {
            return s.isValid;
        });
    }
    get numSections() {
        return this.sections.length;
    }
    get numFields() {
        return this.sections.reduce((total, s) => {
            return total + s.numFields;
        }, 0);
    }
    addSection(section, index) {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.sections.splice(index, 0, section);
        }
        else {
            this.sections.push(section);
        }
    }
    removeSection(index) {
        this.sections.splice(index, 1);
    }
    moveSection(atIndex, toIndex) {
        this.sections.splice(toIndex, 0, this.sections.splice(atIndex, 1)[0]);
    }
    initialize(data, store) {
        this.id = data.id;
        this.store = store;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.icon = valueOrDefault(data.name, "");
        this.sections = valueOrDefault(data.sections, []);
        this.title = valueOrDefault(data.title, "");
        this.subtitle = valueOrDefault(data.subtitle, "");
    }
}
tslib_1.__decorate([
    computed
], Page.prototype, "fieldNames", null);
tslib_1.__decorate([
    computed
], Page.prototype, "fieldIds", null);
tslib_1.__decorate([
    computed
], Page.prototype, "idFieldMap", null);
tslib_1.__decorate([
    computed
], Page.prototype, "errors", null);
tslib_1.__decorate([
    computed
], Page.prototype, "isValid", null);
tslib_1.__decorate([
    computed
], Page.prototype, "numSections", null);
tslib_1.__decorate([
    computed
], Page.prototype, "numFields", null);
tslib_1.__decorate([
    action
], Page.prototype, "addSection", null);
tslib_1.__decorate([
    action
], Page.prototype, "removeSection", null);
tslib_1.__decorate([
    action
], Page.prototype, "moveSection", null);
tslib_1.__decorate([
    action
], Page.prototype, "initialize", null);
decorate(Page, {
    id: observable,
    name: observable,
    uuid: observable,
    icon: observable,
    sections: observable,
    title: observable,
    subtitle: observable
});
export default Page;
