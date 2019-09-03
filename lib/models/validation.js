import { __decorate } from "tslib";
import { action, computed, observable, toJS } from "mobx";
export const ValidationAllowedRules = {
    "input": ["email", "equality", "format", "inclusion", "length", "presence", "url"],
    "checkbox": ["presence"],
    "number": ["presence", "equality", "format"],
    "select": ["presence"],
    "cascader": ["presence"],
    "radiogroup": ["presence"],
    "checkboxgroup": ["presence"],
    "textarea": ["email", "equality", "format", "inclusion", "length", "presence", "url"],
    "daterange": ["presence", "date", "datetime"],
    "datepicker": ["presence", "date", "datetime"],
    "monthpicker": ["presence", "date", "datetime"],
    "timepicker": ["presence", "date", "datetime"],
    "yearpicker": ["presence", "date", "datetime"],
    "starrating": ["presence"],
    "switch": ["presence"],
    "transfer": ["presence"],
    "slider": ["presence"],
    "textblock": [],
    "hidden": [],
    "htmlfragment": [],
};
export const ValidationRuleNames = [
    { key: "date", label: "Date", value: "date" },
    { key: "datetime", label: "Datetime", value: "datetime" },
    { key: "email", label: "Email", value: "email" },
    { key: "equality", label: "Equals", value: "equality" },
    { key: "exclusion", label: "Excludes", value: "exclusion" },
    { key: "format", label: "Matches", value: "format" },
    { key: "inclusion", label: "Includes", value: "inclusion" },
    { key: "length", label: "Length", value: "length" },
    { key: "numericality", label: "Numeric", value: "numericality" },
    { key: "presence", label: "Present", value: "presence" },
    { key: "url", label: "URL", value: "url" }
];
export const ValidationRuleMap = {
    "date": "Date",
    "datetime": "Datetime",
    "email": "Email",
    "equality": "Equals",
    "exclusion": "Excludes",
    "format": "Matches",
    "inclusion": "Includes",
    "length": "Length",
    "numericality": "Numeric",
    "presence": "Present",
    "url": "URL"
};
export class ValidationRule {
    constructor(rule) {
        this.initialize(rule);
    }
    initialize(rule = {}) {
        this.date = rule.date;
        this.datetime = rule.datetime;
        this.email = rule.email;
        this.equality = rule.equality;
        this.exclusion = rule.exclusion;
        this.format = rule.format;
        this.inclusion = rule.inclusion;
        this.length = rule.length;
        this.numericality = rule.numericality;
        this.presence = rule.presence;
        this.url = rule.url;
    }
    get constraints() {
        let c = {};
        Object.keys(ValidationRuleMap).forEach((rule) => {
            if (this[rule]) {
                c[rule] = toJS(this[rule]);
            }
        });
        return c;
    }
    addConstraint(key, settings) {
        this[key] = settings;
    }
    updateConstraint(key, settings) {
        this[key] = settings;
    }
    removeConstraint(key) {
        this[key] = null;
    }
}
__decorate([
    observable
], ValidationRule.prototype, "date", void 0);
__decorate([
    observable
], ValidationRule.prototype, "datetime", void 0);
__decorate([
    observable
], ValidationRule.prototype, "email", void 0);
__decorate([
    observable
], ValidationRule.prototype, "equality", void 0);
__decorate([
    observable
], ValidationRule.prototype, "exclusion", void 0);
__decorate([
    observable
], ValidationRule.prototype, "format", void 0);
__decorate([
    observable
], ValidationRule.prototype, "inclusion", void 0);
__decorate([
    observable
], ValidationRule.prototype, "length", void 0);
__decorate([
    observable
], ValidationRule.prototype, "numericality", void 0);
__decorate([
    observable
], ValidationRule.prototype, "presence", void 0);
__decorate([
    observable
], ValidationRule.prototype, "url", void 0);
__decorate([
    action
], ValidationRule.prototype, "initialize", null);
__decorate([
    computed
], ValidationRule.prototype, "constraints", null);
__decorate([
    action
], ValidationRule.prototype, "addConstraint", null);
__decorate([
    action
], ValidationRule.prototype, "updateConstraint", null);
__decorate([
    action
], ValidationRule.prototype, "removeConstraint", null);
