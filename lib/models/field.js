var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, decorate, observable, computed, observe, toJS } from "mobx";
import Condition from "./condition";
const validate = require("validate.js");
class Field {
    constructor(data, store) {
        this._type = "Field";
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.inputType = data.inputType;
        this.valueType = data.valueType;
        this.valuePropName = data.valuePropName || this.name;
        this.format = data.format || 'string';
        this.validationRules = data.validationRules;
        this.icon = data.icon;
        this.width = data.width;
        this.children = data.children;
        this.storage = data.storage;
        this.showLegend = data.showLegend;
        this.showLabel = data.showLabel;
        this.label = data.label;
        this.helpText = data.helpText;
        this.helpPlacement = data.helpPlacement;
        this.placeholder = data.placeholder;
        this.queryParam = data.queryParam;
        this.saveable = data.saveable;
        this.value = data.value;
        this.location = data.location;
        if (data.condition) {
            this.setCondition(data.condition);
        }
        else {
            this.condition = null;
            this.conditionState = true;
        }
        this.validationErrors = [];
        this.validate();
        return;
    }
    get isValidateable() {
        return !this.isHidden && this.conditionState && !!this.validationRules && Object.keys(this.validationRules).length > 0;
    }
    get isValid() {
        return this.validationErrors.length == 0;
    }
    get isHidden() {
        return this.inputType == "hidden";
    }
    get currentValue() {
        return this.value;
    }
    get isDisabled() {
        return !this.conditionState;
    }
    setValue(value) {
        this.value = value;
        this.store.setFieldValue(this.id, value);
        this.validate();
    }
    setCondition(condition) {
        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;
        observe(this.condition, "value", (change) => {
            this.conditionState = change.newValue;
        }, true);
    }
    validate() {
        if (this.isValidateable == true) {
            let constraints = {};
            constraints[this.name] = toJS(this.validationRules);
            let values = {};
            values[this.name] = this.value || null;
            this.validationErrors = validate(values, constraints, { format: "flat" }) || [];
        }
        else {
            this.validationErrors = [];
        }
        return;
    }
}
__decorate([
    action
], Field.prototype, "initialize", null);
__decorate([
    computed
], Field.prototype, "isValidateable", null);
__decorate([
    computed
], Field.prototype, "isValid", null);
__decorate([
    computed
], Field.prototype, "isHidden", null);
__decorate([
    computed
], Field.prototype, "currentValue", null);
__decorate([
    computed
], Field.prototype, "isDisabled", null);
__decorate([
    action
], Field.prototype, "setValue", null);
__decorate([
    action
], Field.prototype, "setCondition", null);
__decorate([
    action
], Field.prototype, "validate", null);
decorate(Field, {
    id: observable,
    name: observable,
    type: observable,
    inputType: observable,
    icon: observable,
    width: observable,
    children: observable,
    condition: observable,
    storage: observable,
    showLegend: observable,
    showLabel: observable,
    label: observable,
    helpText: observable,
    helpPlacement: observable,
    placeholder: observable,
    queryParam: observable,
    saveable: observable,
    value: observable,
    location: observable,
    conditionState: observable,
    valueType: observable,
    valuePropName: observable,
    format: observable,
    validationRules: observable.shallow,
    validationErrors: observable
});
export default Field;
