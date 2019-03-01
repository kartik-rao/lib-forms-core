import {action, decorate, observable, computed, observe, toJS} from "mobx";
import FormStore from "../state/FormStore";
import * as moment from 'moment'
import Field from "./field";

var validate = require("validate.js");

validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) : number {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value: moment.MomentInput, options: any = {}) : string {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
});

export interface IValidationRule {
    date? : any,
    datetime? : any,
    email?: any,
    equality?: any,
    exclusion?: any,
    format?: any,
    inclusion?: any,
    length?: any,
    numericality?: any,
    presence?: any,
    url?: any
}

export interface IValidationError {
    id: string,
    name: string,
    message: string,
    prefixedMessage: string,
    validator: string
}

export type ValidationRule = Partial<Record<keyof IValidationRule, string>>;

export interface IValidationProps {
    store: FormStore,
    field: Field,
    rule: ValidationRule
}

class Validator {
    store: FormStore;
    field: Field;
    rule : ValidationRule;
    validationErrors: IValidationError[] = [];

    @computed get isValid() : boolean {
        return this.validationErrors.length == 0;
    }

    @computed get errors() : IValidationError[] {
        return this.validationErrors;
    }

    formatError(errors: any): any {
        return errors.map((e: any) => {
            return {id: this.field.id,
                name: e.attribute,
                message: e.options.message,
                prefixedMessage: e.error,
                validator: e.validator
            };
        });
    }

    @computed get isValidateable() {
        let {field} = this;
        return !field.isHidden && field.conditionState && !!this.rule && Object.keys(this.rule).length > 0;
    }

    @action validate() {
        if (this.field.isValidateable == true) {
            let {field, store} = this;
            let {id} = field;
            let constraints = {};
            constraints[field.id] = toJS(this.rule);
            validate.formatters.custom = this.formatError.bind(this);
            let values = toJS(store.values)
            this.validationErrors = validate(values, constraints, {format: "custom"}) || [];
            if (this.validationErrors.length > 0) {
                this.store.setFieldError(id, this.validationErrors[0].message);
            } else {
                this.store.setFieldError(id, undefined);
            }

        } else {
            this.validationErrors = [];
        }
    }

    @action initialize(data: IValidationProps) {
        this.rule = data.rule || {} as ValidationRule;
        this.store = data.store;
        this.field = data.field;
    }

    constructor(data: IValidationProps) {
        this.initialize(data);
    }
}

decorate(Validator, {
    rule: observable,
    validationErrors: observable
});

export default Validator;