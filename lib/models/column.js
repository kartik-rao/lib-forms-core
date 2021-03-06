import { __decorate } from "tslib";
import { action, computed, observable, toJS } from "mobx";
import { valueOrDefault } from "./common";
export class Column {
    constructor(data, store) {
        this._type = "Column";
        this.initialize(data, store);
    }
    get errors() {
        return this.fields.reduce((all, f) => {
            return all.concat(f.validator.errors);
        }, []);
    }
    get isValid() {
        return this.fields.every((f, i) => {
            return f.isValid;
        });
    }
    get idFieldMap() {
        return this.fields.reduce((all, f) => {
            all[f.id] = f;
            return all;
        }, {});
    }
    get uuidFieldMap() {
        return this.fields.reduce((all, f) => {
            all[f.uuid] = f;
            return all;
        }, {});
    }
    get numFields() {
        return this.fields.length;
    }
    addField(field, index) {
        if (typeof index != 'undefined' && index != null && index > -1) {
            this.fields.splice(index, 0, field);
        }
        else {
            this.fields.push(field);
        }
    }
    addFields(...fields) {
        fields.forEach((f) => this.addField(f));
    }
    removeField(index) {
        this.fields.splice(index, 1);
    }
    swapFields(index1, index2) {
        let { fields } = this;
        [fields[index1], fields[index2]] = [fields[index2], fields[index1]];
    }
    moveField(atIndex, toIndex) {
        this.fields.splice(toIndex, 0, this.fields.splice(atIndex, 1)[0]);
    }
    get asPlainObject() {
        let fields = this.fields ? this.fields.map((f) => {
            return f.asPlainObject;
        }) : [];
        return Object.assign(Object.assign({}, toJS({ id: this.id, uuid: this.uuid, span: this.span, name: this.name, title: this.title })), { fields: fields });
    }
    initialize(data, store) {
        this.uuid = data.uuid;
        this.store = store;
        this.id = data.id;
        this.span = data.span;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.fields = valueOrDefault(data.fields, []);
    }
}
__decorate([
    observable
], Column.prototype, "uuid", void 0);
__decorate([
    observable
], Column.prototype, "id", void 0);
__decorate([
    observable
], Column.prototype, "name", void 0);
__decorate([
    observable
], Column.prototype, "span", void 0);
__decorate([
    observable
], Column.prototype, "title", void 0);
__decorate([
    observable
], Column.prototype, "fields", void 0);
__decorate([
    computed
], Column.prototype, "errors", null);
__decorate([
    computed
], Column.prototype, "isValid", null);
__decorate([
    computed
], Column.prototype, "idFieldMap", null);
__decorate([
    computed
], Column.prototype, "uuidFieldMap", null);
__decorate([
    computed
], Column.prototype, "numFields", null);
__decorate([
    action
], Column.prototype, "addField", null);
__decorate([
    action
], Column.prototype, "addFields", null);
__decorate([
    action
], Column.prototype, "removeField", null);
__decorate([
    action
], Column.prototype, "swapFields", null);
__decorate([
    action
], Column.prototype, "moveField", null);
__decorate([
    computed
], Column.prototype, "asPlainObject", null);
__decorate([
    action
], Column.prototype, "initialize", null);
