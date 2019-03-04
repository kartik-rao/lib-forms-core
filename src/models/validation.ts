import {GenericConstraint, DateConstraint, DateTimeConstraint, EmailConstraint, EqualityConstraint, ExclusionConstraint,
    InclusionConstraint, FormatConstraint, LengthConstraint, NumericalityConstraint,
    PresenceConstraint, URLConstraint} from "./validation.constraints";

import { decorate, observable, action, computed, toJS } from "mobx";

export interface IValidationRule {
    date? : DateConstraint,
    datetime? : DateTimeConstraint,
    email?: EmailConstraint,
    equality?: EqualityConstraint,
    exclusion?: ExclusionConstraint,
    format?: FormatConstraint,
    inclusion?: InclusionConstraint,
    length?: LengthConstraint,
    numericality?: NumericalityConstraint,
    presence?: PresenceConstraint,
    url?: URLConstraint
}

export const ValidationRuleNames = [
    {key: "date", label: "Date", value: "date"},
    {key: "datetime", label: "Datetime", value: "datetime"},
    {key: "email", label: "Email", value: "email"},
    {key: "equality", label: "Equals", value: "equality"},
    {key: "exclusion", label: "Excludes", value: "exclusion"},
    {key: "format", label: "Matches", value: "format"},
    {key: "inclusion", label: "Includes", value: "inclusion"},
    {key: "length", label: "Length", value: "length"},
    {key: "numericality", label: "Numeric", value: "numericality"},
    {key: "presence", label: "Present", value: "presence"},
    {key: "url", label: "URL", value: "url"}
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

export interface IValidationError {
    id: string,
    name: string,
    message: string,
    prefixedMessage: string,
    validator: string
}


class ValidationRule implements IValidationRule {
    date : DateConstraint
    datetime : DateTimeConstraint
    email: EmailConstraint
    equality: EqualityConstraint
    exclusion: ExclusionConstraint
    format: FormatConstraint
    inclusion: InclusionConstraint
    length: LengthConstraint
    numericality: NumericalityConstraint
    presence: PresenceConstraint
    url: URLConstraint

    constructor(rule: IValidationRule) {
        this.initialize(rule);
    }

    @action initialize(rule: IValidationRule = {}) {
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

    @computed get constraints() : IValidationRule {
        let c = {};
        Object.keys(ValidationRuleMap).forEach((rule: string) => {
            if (this[rule]) {
                c[rule] = toJS(this[rule]);
            }
        })
        return c;
    }
    @action addConstraint(key: string, settings: GenericConstraint) {
        this[key] = settings;
    }

    @action updateConstraint(key: string, settings: GenericConstraint) {
        this[key] = settings;
    }

    @action removeConstraint(key: string) {
        this[key] = null;
        console.log("After remove constraint", this.constraints);
    }
}

decorate(ValidationRule, {
    date : observable,
    datetime : observable,
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