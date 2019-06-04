import { action, computed, decorate, observable, observe, toJS } from "mobx";
import FormStore from "../store/FormStore";
import Condition, { ICondition } from "./condition";
import {uuid} from "./common";

import {IFieldProps, IComponentProps, IFieldStorage} from "./field.properties";
import Validator from "./validator";
import ValidationRule, { IValidationRule } from "./validation";

class Field implements IFieldProps {
    readonly _type : string = "Field";
    id: string;
    name: string;
    uuid: string;
    type: string;
    label: string;
    value : any;
    touched: boolean;
    inputType: string;
    helpText: string;
    placeholder: string;
    valuePropName: string;
    condition: Condition;
    storage: IFieldStorage;
    store: FormStore;
    conditionState: boolean;
    validator : Validator;
    validation: IValidationRule;
    componentProps: IComponentProps;
    _dispose : any;

    @action mergeUpdate(data: Partial<IFieldProps>) {
        this.id = data.id;
        this.name = data.name;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.valuePropName = data.valuePropName;
        this.componentProps = <IComponentProps>{...this.componentProps, ...data.componentProps};
        return;
    }

    @action initialize(data: IFieldProps, store: FormStore) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid || uuid();
        this.name = data.name || `${this._type}_${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.valuePropName = data.valuePropName || this.name
        this.validation = data.validation;
        this.validator = new Validator({rule: new ValidationRule(data.validation), field: this, store: store});
        this.storage = data.storage;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.componentProps = data.componentProps;

        if (this.componentProps && this.componentProps['defaultValue']) {
            this.setValue(this.componentProps['defaultValue']);
        } else if (this.componentProps && this.componentProps['defaultChecked']) {
            this.setValue(this.componentProps['defaultChecked']);
        }

        this.valuePropName = this.valuePropName ? this.valuePropName : `${this.id}_value`;

        if(this.inputType == 'daterange') {
            this.componentProps["startValuePropsName"] = !!this.componentProps["startValuePropsName"] ? this.componentProps["startValuePropsName"] : `start_date`;
            this.componentProps["endValuePropsName"] = !!this.componentProps["endValuePropsName"] ? this.componentProps["endValuePropsName"] : `end_date`;
        }

        if (data.condition) {
            this.setCondition(data.condition);
        } else {
            this.condition = null;
            this.conditionState = true;
        }
        this.validate();
        return;
    }

    @computed get className() : string {
        return `.fl-field .fl-${this.inputType}${this.type?'-'+this.type:''}`;
    }

    @computed get isTouched() : boolean {
        return this.store.touched[this.id];
    }

    @computed get isValidateable() {
        return this.validator.isValidateable;
    }

    @computed get isValid() : boolean {
        return this.validator.isValid;
    }

    @computed get isHidden() : boolean {
        return this.inputType == "hidden";
    }

    @computed get isRequired() : boolean {
        return !!this.validator.rule.presence;
    }

    @computed get currentValue() {
        return this.value
    }

    @computed get isDisabled() : boolean {
        return !this.conditionState;
    }

    @action setValue(value: any) {
        this.value = value;
        this.store.setFieldValue(this.id, value);
        this.validate();
    }

    @action setTouched() {
        this.touched = true;
        this.store.setFieldTouched(this.id);
        this.validate();
    }

    @action setConditionState(value: boolean) {
        this.conditionState = value;
        this.validate();
    }

    @action setCondition(condition: ICondition) {
        if(condition == null) {
            this.condition = null;
            this.conditionState = true;
            if(this._dispose) {
                this._dispose();
            }
            this.validate();
            return;
        }

        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;

        this._dispose = observe(this.condition, "value", (change) => {
            this.setConditionState(change.newValue)
            if(change.newValue == true) {
                this.validate();
            }
        }, true);
    }

    @action validate() {
       this.validator.validate();
    }

    @computed get serialize(): string  {
        let clone = toJS(this);
        delete clone.store;
        delete clone.validator;;
        return JSON.stringify(clone);
    }

    constructor(data: IFieldProps, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Field, {
    id: observable,
    name: observable,
    uuid: observable,
    type: observable,
    label: observable,
    touched: observable,
    value : observable,
    inputType: observable,
    helpText: observable,
    placeholder: observable,
    validation: observable,
    valuePropName : observable,
    condition: observable,
    storage: observable,
    conditionState: observable,
    validator: observable,
    componentProps: observable
});

export default Field;