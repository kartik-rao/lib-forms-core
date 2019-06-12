import { GenericConstraint, DateConstraint, DateTimeConstraint, EmailConstraint, EqualityConstraint, ExclusionConstraint, InclusionConstraint, FormatConstraint, LengthConstraint, NumericalityConstraint, PresenceConstraint, URLConstraint } from "./validation.constraints";
export interface IValidationRule {
    date?: DateConstraint;
    datetime?: DateTimeConstraint;
    email?: EmailConstraint;
    equality?: EqualityConstraint;
    exclusion?: ExclusionConstraint;
    format?: FormatConstraint;
    inclusion?: InclusionConstraint;
    length?: LengthConstraint;
    numericality?: NumericalityConstraint;
    presence?: PresenceConstraint;
    url?: URLConstraint;
}
export declare const ValidationAllowedRules: {
    "input": string[];
    "checkbox": string[];
    "number": string[];
    "select": string[];
    "cascader": string[];
    "radiogroup": string[];
    "checboxgroup": string[];
    "textarea": string[];
    "daterange": string[];
    "datepicker": string[];
    "monthpicker": string[];
    "timepicker": string[];
    "yearpicker": string[];
    "starrating": string[];
    "switch": string[];
    "transfer": string[];
    "slider": string[];
    "textblock": any[];
    "hidden": any[];
};
export declare const ValidationRuleNames: {
    key: string;
    label: string;
    value: string;
}[];
export declare const ValidationRuleMap: {
    "date": string;
    "datetime": string;
    "email": string;
    "equality": string;
    "exclusion": string;
    "format": string;
    "inclusion": string;
    "length": string;
    "numericality": string;
    "presence": string;
    "url": string;
};
export interface IValidationError {
    id: string;
    name: string;
    message: string;
    prefixedMessage: string;
    validator: string;
}
declare class ValidationRule implements IValidationRule {
    date: DateConstraint;
    datetime: DateTimeConstraint;
    email: EmailConstraint;
    equality: EqualityConstraint;
    exclusion: ExclusionConstraint;
    format: FormatConstraint;
    inclusion: InclusionConstraint;
    length: LengthConstraint;
    numericality: NumericalityConstraint;
    presence: PresenceConstraint;
    url: URLConstraint;
    constructor(rule: IValidationRule);
    initialize(rule?: IValidationRule): void;
    readonly constraints: IValidationRule;
    addConstraint(key: string, settings: GenericConstraint): void;
    updateConstraint(key: string, settings: GenericConstraint): void;
    removeConstraint(key: string): void;
}
export default ValidationRule;
