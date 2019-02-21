import { CheckboxOptionType } from "antd/lib/checkbox/Group";
import { action, computed, decorate, observable, observe, toJS } from "mobx";
import FormStore from "../state/FormStore";
import Condition, { ICondition } from "./condition";

const validate = require('validate.js');

validate.formatters.custom = (errors) => {
    return errors.map((e: any) => {
        return {field: e.attribute, message: e.options.message, prefixedMessage: e.error, validator: e.validator};
    });
}

export interface IFieldStorage {
    unique: boolean;
    name: string;
    type: string;
    customerKey: string;
    description: string;
    isNullable: boolean;
    isPrimaryKey: boolean;
    isRequired: boolean;
    isSendable: boolean;
}

export type RadioSelectCheckboxOption = CheckboxOptionType | { label: string, value: string, disabled?: boolean };
export interface IField {
    id: string;
    name: string;
    type: string;
    inputType?: string;
    icon?: string;
    width?: string;
    children?: RadioSelectCheckboxOption[];
    condition?: any;
    storage?: IFieldStorage;
    showLegend?: boolean;
    showLabel?: boolean;
    label?: string;
    helpText?: string;
    helpPlacement?: string;
    placeholder: string;
    queryParam?: string;
    saveable?: boolean;
    value? : string;
    location: any;
    valueType? : string;
    valuePropName? : string;
    format? : string;
    validationRules? : any;
}

class Field implements IField {
    readonly _type : string = "Field";
    id: string;
    name: string;
    type: string;
    inputType: string;
    icon: string;
    width: string;
    children: RadioSelectCheckboxOption[];
    condition: Condition
    storage: IFieldStorage;
    showLegend: boolean;
    showLabel: boolean;
    label: string;
    helpText: string;
    helpPlacement: string;
    placeholder: string;
    queryParam: string;
    saveable: boolean;
    value : string;
    location: any;
    store: FormStore;
    conditionState: boolean;
    valueType : string;
    valuePropName : string;
    format : string;
    validationRules : any;
    validationErrors: any[];

    @action initialize(data: IField, store: FormStore) {
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
        } else {
            this.condition = null;
            this.conditionState = true;
        }
        this.validationErrors = [];
        this.validate();
        return;
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

    @action setCondition(condition: ICondition) {
        this.condition = new Condition(condition, this.store);
        this.conditionState = this.condition.value;
        observe(this.condition, "value", (change) => {
            this.conditionState = change.newValue;
        }, true)
    }

    @action validate() {
        if (this.isValidateable == true) {
            let constraints = {};
            constraints[this.name] = toJS(this.validationRules);
            let values = {};
            values[this.name] = this.value || null;
            this.validationErrors = validate(values, constraints, {format: "custom"}) || [];
        } else {
            this.validationErrors = [];
        }

        return;
    }

    constructor(data: IField, store: FormStore) {
        this.initialize(data, store);
    }
}

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
    value : observable,
    location: observable,
    conditionState: observable,
    valueType : observable,
    valuePropName : observable,
    format : observable,
    validationRules : observable.shallow,
    validationErrors: observable
})

export default Field;