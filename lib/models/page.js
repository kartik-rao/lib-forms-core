var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed } from "mobx";
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
        if (index) {
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
        this.name = data.name || "";
        this.icon = data.icon || "";
        this.sections = data.sections || [];
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.store = store;
    }
}
__decorate([
    computed
], Page.prototype, "fieldNames", null);
__decorate([
    computed
], Page.prototype, "errors", null);
__decorate([
    computed
], Page.prototype, "isValid", null);
__decorate([
    computed
], Page.prototype, "numSections", null);
__decorate([
    computed
], Page.prototype, "numFields", null);
__decorate([
    action
], Page.prototype, "addSection", null);
__decorate([
    action
], Page.prototype, "removeSection", null);
__decorate([
    action
], Page.prototype, "moveSection", null);
__decorate([
    action
], Page.prototype, "initialize", null);
decorate(Page, {
    name: observable,
    icon: observable,
    sections: observable,
    title: observable,
    subtitle: observable
});
export default Page;
