var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed } from "mobx";
class Section {
    constructor(data, store) {
        this._type = "Section";
        this.initialize(data, store);
    }
    get errors() {
        return this.columns.reduce((all, c) => {
            return all.concat(c.errors);
        }, []);
    }
    get numFields() {
        return this.columns.reduce((total, column) => {
            total = total + column.numFields;
            return total;
        }, 0);
    }
    addColumn(column, index) {
        if (index) {
            this.columns.splice(index, 0, column);
        }
        else {
            this.columns.push(column);
        }
    }
    removeColumn(index) {
        this.columns.splice(index, 1);
    }
    moveColumn(atIndex, toIndex) {
        this.columns.splice(toIndex, 0, this.columns.splice(atIndex, 1)[0]);
    }
    get numColumns() {
        return this.columns.length;
    }
    get isValid() {
        return this.columns.every((c) => {
            return c.isValid;
        });
    }
    initialize(data, store) {
        this.id = data.id;
        this.name = data.name || `section-${data.id}`;
        this.title = data.title || '';
        this.gutter = data.gutter;
        this.columns = data.columns || [];
        this.store = store;
    }
}
__decorate([
    computed
], Section.prototype, "errors", null);
__decorate([
    computed
], Section.prototype, "numFields", null);
__decorate([
    action
], Section.prototype, "addColumn", null);
__decorate([
    action
], Section.prototype, "removeColumn", null);
__decorate([
    action
], Section.prototype, "moveColumn", null);
__decorate([
    computed
], Section.prototype, "numColumns", null);
__decorate([
    computed
], Section.prototype, "isValid", null);
__decorate([
    action
], Section.prototype, "initialize", null);
decorate(Section, {
    name: observable,
    id: observable,
    title: observable,
    gutter: observable,
    columns: observable
});
export default Section;
