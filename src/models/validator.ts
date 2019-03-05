import {action, decorate, observable, computed, toJS} from "mobx";
import FormStore from "../store/FormStore";
import moment from 'moment'
import Field from "./field";
import ValidationRule, {IValidationError, IValidationRule} from "./validation";

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

export interface IValidationProps {
    store: FormStore,
    field: Field,
    rule: IValidationRule
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

    formatError(errors: any): IValidationError {
        return errors.map((e: any) => {
            let prefixedMessage = e.error || "";
            let unPrefixedMessage = e.error ? e.error.replace(`${e.attribute.toUpperCase()} `, "") : e.options.message;
            return {id: this.field.id,
                name: e.attribute,
                message: unPrefixedMessage,
                prefixedMessage: prefixedMessage,
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
            constraints[field.id] = this.rule.constraints;
            validate.formatters.custom = this.formatError.bind(this);
            let values = toJS(store.values);

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

    @computed get isRequired() : boolean {
        return !!this.rule.presence;
    }

    @action initialize(data: IValidationProps) {
        this.rule = new ValidationRule(data.rule || {} as IValidationRule);
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