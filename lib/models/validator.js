import { __decorate } from "tslib";
import { action, observable, computed, toJS } from "mobx";
import moment from 'moment';
import { ValidationRule } from "./validation";
var validate = require("validate.js");
validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function (value, options) {
        return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function (value, options = {}) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
});
export class Validator {
    constructor(data) {
        this.validationErrors = [];
        this.initialize(data);
    }
    get isValid() {
        return this.validationErrors.length == 0;
    }
    get errors() {
        return this.validationErrors;
    }
    formatError(errors) {
        return errors.map((e) => {
            let prefixedMessage = e.error || "";
            let unPrefixedMessage = e.error ? e.error.replace(`${e.attribute.toUpperCase()} `, "") : e.options.message;
            return { id: this.field.id,
                name: e.attribute,
                message: unPrefixedMessage,
                prefixedMessage: prefixedMessage,
                validator: e.validator
            };
        });
    }
    get isValidateable() {
        let { field } = this;
        return !this.store.validationDisabled && !field.isHidden && field.conditionState && !!this.rule && Object.keys(this.rule).length > 0;
    }
    validate() {
        if (this.isValidateable == true) {
            let { field, store } = this;
            let { id } = field;
            let constraints = {};
            constraints[field.id] = this.rule.constraints;
            validate.formatters.custom = this.formatError.bind(this);
            let values = toJS(store.values);
            this.validationErrors = validate(values, constraints, { format: "custom" }) || [];
            if (this.validationErrors.length > 0) {
                this.store.setFieldError(id, this.validationErrors[0].message);
            }
            else {
                this.store.setFieldError(id, undefined);
            }
        }
        else {
            this.validationErrors = [];
        }
    }
    get isRequired() {
        return !!this.rule.presence;
    }
    initialize(data) {
        this.rule = new ValidationRule(data.rule || {});
        this.store = data.store;
        this.field = data.field;
    }
}
__decorate([
    observable
], Validator.prototype, "rule", void 0);
__decorate([
    observable
], Validator.prototype, "validationErrors", void 0);
__decorate([
    computed
], Validator.prototype, "isValid", null);
__decorate([
    computed
], Validator.prototype, "errors", null);
__decorate([
    computed
], Validator.prototype, "isValidateable", null);
__decorate([
    action
], Validator.prototype, "validate", null);
__decorate([
    computed
], Validator.prototype, "isRequired", null);
__decorate([
    action
], Validator.prototype, "initialize", null);
