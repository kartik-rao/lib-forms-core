var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { decorate, observable, action, computed, toJS } from "mobx";
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
