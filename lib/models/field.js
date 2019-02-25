var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, decorate, observable, observe, toJS } from "mobx";
import Condition from "./condition";
import { uuid } from "./common";
const validate = require('validate.js');
class Field {
    constructor(data, store) {
        this._type = "Field";
        this.initialize(data, store);
    }
    initialize(data, store) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid || uuid();
        this.name = data.name || `${this._type}-${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.valuePropName = data.valuePropName;
        this.validationRules = data.validationRules;
        this.storage = data.storage;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.componentProps = data.componentProps;
        this.setValue(data.value);
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
    formatError(errors) {
        return errors.map((e) => {
            return { id: this.id,
                name: e.attribute,
                message: e.options.message,
                prefixedMessage: e.error,
                validator: e.validator
            };
        });
    }
    get isTouched() {
        return this.store.touched[this.id];
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
    setTouched() {
        this.store.setFieldTouched(this.id);
        this.validate();
    }
    setConditionState(value) {
        this.conditionState = value;
    }
    setCondition(condition) {
        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;
        observe(this.condition, "value", (change) => {
            this.setConditionState(change.newValue);
            if (change.newValue == true) {
                this.validate();
            }
        }, true);
    }
    validate() {
        if (this.isValidateable == true) {
            let constraints = {};
            constraints[this.name] = toJS(this.validationRules);
            let values = {};
            values[this.name] = this.store.values[this.id] || null;
            validate.formatters.custom = this.formatError.bind(this);
            this.validationErrors = validate(values, constraints, { format: "custom" }) || [];
            if (this.validationErrors.length > 0) {
                this.store.setFieldError(this.id, this.validationErrors[0].message);
            }
            else {
                this.store.setFieldError(this.id, undefined);
            }
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
    options: observable,
    valuePropName: observable,
    condition: observable,
    storage: observable,
    conditionState: observable,
    validationRules: observable,
    validationErrors: observable,
    componentProps: observable
});
export default Field;
