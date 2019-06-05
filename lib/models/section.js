import * as tslib_1 from "tslib";
import { action, decorate, observable, computed } from "mobx";
import { valueOrDefault } from "./common";
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
    get idFieldMap() {
        return this.columns.reduce((all, c) => {
            return Object.assign({}, all, c.idFieldMap);
        }, {});
    }
    initialize(data, store) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.gutter = valueOrDefault(data.gutter, 0);
        this.columns = valueOrDefault(data.columns, []);
        this.store = store;
    }
}
tslib_1.__decorate([
    computed
], Section.prototype, "errors", null);
tslib_1.__decorate([
    computed
], Section.prototype, "numFields", null);
tslib_1.__decorate([
    action
], Section.prototype, "addColumn", null);
tslib_1.__decorate([
    action
], Section.prototype, "removeColumn", null);
tslib_1.__decorate([
    action
], Section.prototype, "moveColumn", null);
tslib_1.__decorate([
    computed
], Section.prototype, "numColumns", null);
tslib_1.__decorate([
    computed
], Section.prototype, "isValid", null);
tslib_1.__decorate([
    computed
], Section.prototype, "idFieldMap", null);
tslib_1.__decorate([
    action
], Section.prototype, "initialize", null);
decorate(Section, {
    id: observable,
    name: observable,
    uuid: observable,
    title: observable,
    gutter: observable,
    columns: observable
});
export default Section;
