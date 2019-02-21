var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed, observe } from "mobx";
var validate = require("validate.js");
export var FieldType;
(function (FieldType) {
    FieldType["string"] = "string";
    FieldType["number"] = "number";
    FieldType["boolean"] = "boolean";
    FieldType["method"] = "method";
    FieldType["regexp"] = "regexp";
    FieldType["integer"] = "integer";
    FieldType["float"] = "float";
    FieldType["array"] = "array";
    FieldType["object"] = "object";
    FieldType["enum"] = "enum";
    FieldType["date"] = "date";
    FieldType["url"] = "url";
    FieldType["hex"] = "hex";
    FieldType["email"] = "email";
})(FieldType || (FieldType = {}));
export class FieldValidationRule {
    constructor(props) {
        this.name = props.name;
        this.value = props.value;
        this.message = props.message;
    }
}
class FieldValidation {
    constructor(store) {
        this.rules = [];
        observe;
    }
    addRule(rule) {
        this.rules.push(new FieldValidationRule(rule));
    }
    addRules(rules = []) {
        let self = this;
        rules.forEach((r) => {
            self.addRule(r);
        });
        return this;
    }
    get isValid() {
        return false;
    }
    initialize(store) {
        this.store = store;
    }
}
__decorate([
    computed
], FieldValidation.prototype, "isValid", null);
__decorate([
    action
], FieldValidation.prototype, "initialize", null);
decorate(FieldValidation, {
    rules: observable
});
export default FieldValidation;
