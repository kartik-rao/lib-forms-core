import { action, computed, decorate, observable, observe, toJS, reaction } from "mobx";
import FormStore from "../state/FormStore";
import Condition, { ICondition } from "./condition";
import {uuid} from "./common";
const validate = require('validate.js');

import {IFieldProps, IComponentProps, IFieldStorage, ChoiceOption} from "./field.properties";

class Field implements IFieldProps {
    readonly _type : string = "Field";
    id: string;
    name: string;
    uuid: string;
    type: string;
    label: string;
    value : any;
    inputType: string;
    helpText: string;
    placeholder: string;
    options: ChoiceOption[];
    valuePropName: string[];
    condition: Condition;
    storage: IFieldStorage;
    store: FormStore;
    conditionState: boolean;
    validationRules : any;
    validationErrors: any[];
    componentProps: IComponentProps;

    @action initialize(data: IFieldProps, store: FormStore) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid || uuid();
        this.name = data.name || `${this._type}-${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.valuePropName = data.valuePropName
        this.validationRules = data.validationRules;
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

        if (data.condition) {
            this.setCondition(data.condition);
        } else {
            this.condition = null;
            this.conditionState = true;
        }
        this.validationErrors = [];
        this.validate();
        return;
    }

    formatError(errors: any): any {
        return errors.map((e: any) => {
            return {id: this.id,
                name: e.attribute,
                message: e.options.message,
                prefixedMessage: e.error,
                validator: e.validator
            };
        });
    }

    @computed get isTouched() : boolean {
        return this.store.touched[this.id];
    }

    @computed get isValidateable() {
        return !this.isHidden && this.conditionState && !!this.validationRules && Object.keys(this.validationRules).length > 0;
    }

    @computed get isValid() : boolean {
        return this.validationErrors.length == 0;
    }

    @computed get isHidden() : boolean {
        return this.inputType == "hidden";
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
        this.store.setFieldTouched(this.id);
        this.validate();
    }

    @action setConditionState(value: boolean) {
        this.conditionState = value;
    }

    @action setCondition(condition: ICondition) {
        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;

        observe(this.condition, "value", (change) => {
            this.setConditionState(change.newValue)
            if(change.newValue == true) {
                this.validate();
            }
        }, true);
    }

    @action validate() {
        if (this.isValidateable == true) {
            let constraints = {};
            constraints[this.name] = toJS(this.validationRules);
            let values = {};
            values[this.name] = this.store.values[this.id] || null;
            validate.formatters.custom = this.formatError.bind(this);
            this.validationErrors = validate(values, constraints, {format: "custom"}) || [];
            if (this.validationErrors.length > 0) {
                this.store.setFieldError(this.id, this.validationErrors[0].message);
            } else {
                this.store.setFieldError(this.id, undefined);
            }

        } else {
            this.validationErrors = [];
        }
        return;
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
    value : observable,
    inputType: observable,
    helpText: observable,
    placeholder: observable,
    options: observable,
    valuePropName : observable,
    condition: observable,
    storage: observable,
    conditionState: observable,
    validationRules : observable,
    validationErrors: observable,
    componentProps: observable
});

export default Field;