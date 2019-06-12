import * as tslib_1 from "tslib";
import { decorate, observable, action, computed, toJS } from "mobx";
export const ValidationAllowedRules = {
    "input": ["email", "equality", "format", "inclusion", "length", "presence", "url"],
    "checkbox": ["presence"],
    "number": ["presence", "equality", "format"],
    "select": ["presence"],
    "cascader": ["presence"],
    "radiogroup": ["presence"],
    "checboxgroup": ["presence"],
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
    "hidden": []
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
class ValidationRule {
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
tslib_1.__decorate([
    action
], ValidationRule.prototype, "initialize", null);
tslib_1.__decorate([
    computed
], ValidationRule.prototype, "constraints", null);
tslib_1.__decorate([
    action
], ValidationRule.prototype, "addConstraint", null);
tslib_1.__decorate([
    action
], ValidationRule.prototype, "updateConstraint", null);
tslib_1.__decorate([
    action
], ValidationRule.prototype, "removeConstraint", null);
decorate(ValidationRule, {
    date: observable,
    datetime: observable,
    email: observable,
    equality: observable,
    exclusion: observable,
    format: observable,
    inclusion: observable,
    length: observable,
    numericality: observable,
    presence: observable,
    url: observable
});
export default ValidationRule;
