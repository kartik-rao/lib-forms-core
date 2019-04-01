var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed } from "mobx";
import { valueOrDefault, uuid } from "./common";
class Column {
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
    get numFields() {
        return this.fields.length;
    }
    addField(field, index) {
        if (index) {
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
    moveField(atIndex, toIndex) {
        this.fields.splice(toIndex, 0, this.fields.splice(atIndex, 1)[0]);
    }
    initialize(data, store) {
        this.uuid = valueOrDefault(data.uuid, uuid());
        this.store = store;
        this.id = data.id;
        this.span = data.span;
        this.name = valueOrDefault(data.name, `${this._type}-${data.id}`);
        this.title = valueOrDefault(data.title, '');
        this.fields = valueOrDefault(data.fields, []);
    }
}
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
], Column.prototype, "moveField", null);
__decorate([
    action
], Column.prototype, "initialize", null);
decorate(Column, {
    name: observable,
    uuid: observable,
    id: observable,
    title: observable,
    span: observable,
    fields: observable
});
export default Column;
