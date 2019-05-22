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