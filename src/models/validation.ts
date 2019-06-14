import { action, computed, observable, toJS } from "mobx";
import { DateConstraint, DateTimeConstraint, EmailConstraint, EqualityConstraint, ExclusionConstraint, FormatConstraint, GenericConstraint, InclusionConstraint, LengthConstraint, NumericalityConstraint, PresenceConstraint, URLConstraint } from "./validation.constraints";


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

export const ValidationAllowedRules = {
    "input"       : ["email", "equality", "format", "inclusion", "length", "presence", "url"],
    "checkbox"    : ["presence"],
    "number"      : ["presence", "equality", "format"],
    "select"      : ["presence"],
    "cascader"    : ["presence"],
    "radiogroup"  : ["presence"],
    "checkboxgroup": ["presence"],
    "textarea"    : ["email", "equality", "format", "inclusion", "length", "presence", "url"],
    "daterange"   : ["presence", "date", "datetime"],
    "datepicker"  : ["presence", "date", "datetime"],
    "monthpicker" : ["presence", "date", "datetime"],
    "timepicker"  : ["presence", "date", "datetime"],
    "yearpicker"  : ["presence", "date", "datetime"],
    "starrating"  : ["presence"],
    "switch"      : ["presence"],
    "transfer"    : ["presence"],
    "slider"      : ["presence"],
    "textblock"   : [],
    "hidden"      : [],
    "htmlfragment": [],
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

export class ValidationRule implements IValidationRule {
    @observable date : DateConstraint
    @observable datetime : DateTimeConstraint
    @observable email: EmailConstraint
    @observable equality: EqualityConstraint
    @observable exclusion: ExclusionConstraint
    @observable format: FormatConstraint
    @observable inclusion: InclusionConstraint
    @observable length: LengthConstraint
    @observable numericality: NumericalityConstraint
    @observable presence: PresenceConstraint
    @observable url: URLConstraint

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
    }
}