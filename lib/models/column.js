var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed } from "mobx";
class Column {
    constructor(data, store) {
        this._type = "Column";
        this.initialize(data, store);
    }
    get isValid() {
        return this.fields.every((f, i) => {
            return f.isValid;
        });
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
    removeField(index) {
        this.fields.splice(index, 1);
    }
    moveField(atIndex, toIndex) {
        this.fields.splice(toIndex, 0, this.fields.splice(atIndex, 1)[0]);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.name = name || `column-${data.id}`;
        this.title = data.title || '';
        this.fields = data.fields || [];
    }
}
__decorate([
    computed
], Column.prototype, "isValid", null);
__decorate([
    computed
], Column.prototype, "numFields", null);
__decorate([
    action
], Column.prototype, "addField", null);
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
    id: observable,
    title: observable,
    fields: observable
});
export default Column;
