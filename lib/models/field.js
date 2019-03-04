var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, decorate, observable, observe, toJS } from "mobx";
import Condition from "./condition";
import { uuid } from "./common";
import Validator from "./validator";
import ValidationRule from "./validation";
class Field {
    constructor(data, store) {
        this._type = "Field";
        this.initialize(data, store);
    }
    mergeUpdate(data) {
        this.id = data.id;
        this.name = data.name;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.valuePropName = data.valuePropName;
        this.componentProps = Object.assign({}, this.componentProps, data.componentProps);
        return;
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid || uuid();
        this.name = data.name || `${this._type}_${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.valuePropName = data.valuePropName || this.name;
        this.validation = data.validation;
        this.validator = new Validator({ rule: new ValidationRule(data.validation), field: this, store: store });
        this.storage = data.storage;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.componentProps = data.componentProps;
        if (this.componentProps && this.componentProps['defaultValue']) {
            this.setValue(this.componentProps['defaultValue']);
        }
        else if (this.componentProps && this.componentProps['defaultChecked']) {
            this.setValue(this.componentProps['defaultChecked']);
        }
        this.valuePropName = this.valuePropName ? this.valuePropName : `${this.id}_value`;
        if (this.inputType == 'daterange') {
            this.componentProps["startValuePropsName"] = !!this.componentProps["startValuePropsName"] ? this.componentProps["startValuePropsName"] : `start_date`;
            this.componentProps["endValuePropsName"] = !!this.componentProps["endValuePropsName"] ? this.componentProps["endValuePropsName"] : `end_date`;
        }
        if (data.condition) {
            this.setCondition(data.condition);
        }
        else {
            this.condition = null;
            this.conditionState = true;
        }
        this.validate();
        return;
    }
    get className() {
        return `.fl-field .fl-${this.inputType}${this.type ? '-' + this.type : ''}`;
    }
    get isTouched() {
        return this.store.touched[this.id];
    }
    get isValidateable() {
        return this.validator.isValidateable;
    }
    get isValid() {
        return this.validator.isValid;
    }
    get isHidden() {
        return this.inputType == "hidden";
    }
    get isRequired() {
        return !!this.validator.rule.presence;
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
    setTouched() {
        this.store.setFieldTouched(this.id);
        this.validate();
    }
    setConditionState(value) {
        this.conditionState = value;
    }
    setCondition(condition) {
        if (condition == null) {
            this.condition = null;
            this.conditionState = true;
            if (this._dispose) {
                this._dispose();
            }
            this.validate();
            return;
        }
        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;
        this._dispose = observe(this.condition, "value", (change) => {
            this.setConditionState(change.newValue);
            if (change.newValue == true) {
                this.validate();
            }
        }, true);
    }
    validate() {
        this.validator.validate();
    }
    get serialize() {
        let clone = toJS(this);
        delete clone.store;
        delete clone.validator;
        ;
        return JSON.stringify(clone);
    }
}
__decorate([
    action
], Field.prototype, "mergeUpdate", null);
__decorate([
    action
], Field.prototype, "initialize", null);
__decorate([
    computed
], Field.prototype, "className", null);
__decorate([
    computed
], Field.prototype, "isTouched", null);
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
], Field.prototype, "isRequired", null);
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
], Field.prototype, "setTouched", null);
__decorate([
    action
], Field.prototype, "setConditionState", null);
__decorate([
    action
], Field.prototype, "setCondition", null);
__decorate([
    action
], Field.prototype, "validate", null);
__decorate([
    computed
], Field.prototype, "serialize", null);
decorate(Field, {
    id: observable,
    name: observable,
    uuid: observable,
    type: observable,
    label: observable,
    value: observable,
    inputType: observable,
    helpText: observable,
    placeholder: observable,
    validation: observable,
    options: observable,
    valuePropName: observable,
    condition: observable,
    storage: observable,
    conditionState: observable,
    validator: observable,
    componentProps: observable,
});
export default Field;
