import { action, computed, observable, observe, toJS } from "mobx";
import { FormStoreType } from "../store/FormStore";
import { Condition, ICondition } from "./condition";
import { IFieldOptions } from "./field.options";
import { IComponentProps, IFieldProps, IFieldRuntimeProps, IFieldStorage } from "./field.properties";
import { ItemLayoutOptions } from './layout';
import { IValidationRule, ValidationRule } from "./validation";
import { Validator } from "./validator";


export class Field implements IFieldProps, IFieldRuntimeProps {
    readonly _type : string = "Field";
    uuid: string;
    @observable id: string;
    @observable name: string;

    @observable type: string;
    @observable label: string;
    @observable value : any;
    @observable touched: boolean;
    @observable inputType: string;
    @observable helpText: string;
    @observable placeholder: string;
    fieldOptions: IFieldOptions;
    children: any;
    @observable condition: Condition;
    @observable storage: IFieldStorage;
    store: FormStoreType;
    @observable location: any;
    @observable conditionState: boolean;
    @observable validator : Validator;
    validation: IValidationRule;
    @observable componentProps: IComponentProps;
    @observable itemLayoutOptions : ItemLayoutOptions;
    _dispose : any;

    @action mergeUpdate(data: Partial<IFieldProps>) {
        this.id = data.id ? data.id : this.id;
        this.name = data.name;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        let {fieldOptions} = data;
        this.fieldOptions = {...this.fieldOptions, ...{valuePropName: fieldOptions ? fieldOptions.valuePropName : this.fieldOptions.valuePropName}};
        this.componentProps = <IComponentProps>{...this.componentProps, ...data.componentProps};
        return;
    }

    @action initialize(data: IFieldProps, store: FormStoreType) {
        this.store = store;
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = data.name || `${this._type}_${data.id}`;
        this.type = data.type;
        this.label = data.label;
        this.inputType = data.inputType;
        this.fieldOptions = data.fieldOptions ? Object.assign({id: data.id}, {...data.fieldOptions}) : {id: data.id};
        this.fieldOptions.valuePropName = (data.fieldOptions||{}).valuePropName || this.name;
        this.validation = data.validation;
        this.validator = new Validator({rule: new ValidationRule(data.validation), field: this, store: store});
        this.storage = data.storage;
        this.label = data.label;
        this.helpText = data.helpText;
        this.placeholder = data.placeholder;
        this.children = data.children || {};
        this.componentProps = data.componentProps || {};
        this.location = data.location || {};
        this.touched = false;
        this.itemLayoutOptions = new ItemLayoutOptions(data.itemLayoutOptions);

        if (this.componentProps && this.componentProps['defaultValue']) {
            this.setValue(this.componentProps['defaultValue']);
        } else if (this.componentProps && this.componentProps['defaultChecked']) {
            this.setValue(this.componentProps['defaultChecked']);
        }

        if (!this.fieldOptions.valuePropName) {
            this.fieldOptions.valuePropName = `${this.id}_value`;
        }

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
        if(condition == null || !condition.predicates || condition.predicates.length == 0) {
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

    constructor(data: IFieldProps, store: FormStoreType) {
        this.initialize(data, store);
    }
}