import { __decorate } from "tslib";
import { action, computed, observable, toJS } from "mobx";
import { valueOrDefault } from "./common";
export class Section {
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
        if (!column.span) {
            column.span = 6;
        }
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.columns.splice(index, 0, column);
        }
        else {
            this.columns.push(column);
        }
    }
    removeColumn(index) {
        this.columns.splice(index, 1);
    }
    swapColumns(index1, index2) {
        let { columns } = this;
        [columns[index1], columns[index2]] = [columns[index2], columns[index1]];
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
            return Object.assign(Object.assign({}, all), c.idFieldMap);
        }, {});
    }
    get uuidFieldMap() {
        return this.columns.reduce((all, c) => {
            return Object.assign(Object.assign({}, all), c.uuidFieldMap);
        }, {});
    }
    get asPlainObject() {
        let columns = this.columns ? this.columns.map((c) => {
            return c.asPlainObject;
        }) : [];
        return Object.assign(Object.assign({}, toJS({ id: this.
                id, uuid: this.uuid,
            name: this.name,
            title: this.title,
            gutter: this.gutter
        })), { columns: columns });
    }
    initialize(data, store) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.gutter = valueOrDefault(data.gutter, 16);
        this.columns = valueOrDefault(data.columns, []);
        this.store = store;
    }
}
__decorate([
    observable
], Section.prototype, "id", void 0);
__decorate([
    observable
], Section.prototype, "uuid", void 0);
__decorate([
    observable
], Section.prototype, "name", void 0);
__decorate([
    observable
], Section.prototype, "title", void 0);
__decorate([
    observable
], Section.prototype, "gutter", void 0);
__decorate([
    observable
], Section.prototype, "columns", void 0);
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
], Section.prototype, "swapColumns", null);
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
    computed
], Section.prototype, "idFieldMap", null);
__decorate([
    computed
], Section.prototype, "uuidFieldMap", null);
__decorate([
    computed
], Section.prototype, "asPlainObject", null);
__decorate([
    action
], Section.prototype, "initialize", null);
