import * as tslib_1 from "tslib";
import { action, computed, decorate, observable, observe, toJS } from "mobx";
import Condition from "./condition";
import Validator from "./validator";
import ValidationRule from "./validation";
class Field {
    constructor(data, store) {
        this._type = "Field";
        this.initialize(data, store);
    }
    mergeUpdate(data) {
        this.id = data.id ? data.id : this.id;
        this.name = data.name;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        let { fieldOptions } = data;
        this.fieldOptions = Object.assign({}, this.fieldOptions, { valuePropName: fieldOptions ? fieldOptions.valuePropName : this.fieldOptions.valuePropName });
        this.componentProps = Object.assign({}, this.componentProps, data.componentProps);
        return;
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = data.name || `${this._type}_${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.fieldOptions = data.fieldOptions ? Object.assign({ id: data.id }, Object.assign({}, data.fieldOptions)) : { id: data.id };
        this.fieldOptions.valuePropName = (data.fieldOptions || {}).valuePropName || this.name;
        this.validation = data.validation;
        this.validator = new Validator({ rule: new ValidationRule(data.validation), field: this, store: store });
        this.storage = data.storage;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.children = data.children || {};
        this.componentProps = data.componentProps || {};
        this.location = data.location || {};
        this.touched = false;
        if (this.componentProps && this.componentProps['defaultValue']) {
            this.setValue(this.componentProps['defaultValue']);
        }
        else if (this.componentProps && this.componentProps['defaultChecked']) {
            this.setValue(this.componentProps['defaultChecked']);
        }
        if (!this.fieldOptions.valuePropName) {
            this.fieldOptions.valuePropName = `${this.id}_value`;
        }
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
        this.touched = true;
        this.store.setFieldTouched(this.id);
        this.validate();
    }
    setConditionState(value) {
        this.conditionState = value;
        this.validate();
    }
    setCondition(condition) {
        if (condition == null || !condition.predicates || condition.predicates.length == 0) {
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
tslib_1.__decorate([
    action
], Field.prototype, "mergeUpdate", null);
tslib_1.__decorate([
    action
], Field.prototype, "initialize", null);
tslib_1.__decorate([
    computed
], Field.prototype, "className", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isTouched", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isValidateable", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isValid", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isHidden", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isRequired", null);
tslib_1.__decorate([
    computed
], Field.prototype, "currentValue", null);
tslib_1.__decorate([
    computed
], Field.prototype, "isDisabled", null);
tslib_1.__decorate([
    action
], Field.prototype, "setValue", null);
tslib_1.__decorate([
    action
], Field.prototype, "setTouched", null);
tslib_1.__decorate([
    action
], Field.prototype, "setConditionState", null);
tslib_1.__decorate([
    action
], Field.prototype, "setCondition", null);
tslib_1.__decorate([
    action
], Field.prototype, "validate", null);
tslib_1.__decorate([
    computed
], Field.prototype, "serialize", null);
decorate(Field, {
    id: observable,
    name: observable,
    uuid: observable,
    type: observable,
    label: observable,
    touched: observable,
    value: observable,
    inputType: observable,
    helpText: observable,
    placeholder: observable,
    validation: observable,
    fieldOptions: observable,
    condition: observable,
    storage: observable,
    conditionState: observable,
    validator: observable,
    componentProps: observable
});
export default Field;
