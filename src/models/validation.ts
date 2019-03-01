type EmailConstraintProps = {
    message: string;
}

type DateConstraintProps = {
    earliest?: string;
    latest?  :string;
    dateOnly?: boolean;
    notValid: string;
    tooEarly: string;
    tooLate : string;
    message: string;
}

// Validator will expect value to be present in values object with key of attribute
type EqualityConstraintProps = {
    attribute : string;
    comparator?: any;
    message: string;
}

type ExclusionConstraintProps = {
    within: any|string[];
    message: string;
}

type InclusionConstraintProps = {
    within: any|string[];
    message: string;
}

type FormatConstraintProps = {
    pattern: string;
    flags?: string;
    message: string;
}

type LengthConstraintProps = {
    is : number;
    minimum: number;
    maximum: number;
    notValid: string;
    tooLong: string;
    tooShort: string;
    wrongLength: string;
    tokenizer: any;
    message: string;
}

type NumericalityConstraintProps = {
    onlyInteger: boolean;
    strict: boolean;
    greaterThan: number;
    greaterThanOrEqualTo: number;
    equalTo: number;
    lessThanOrEqualTo: number;
    lessThan: number;
    divisibleBy: number;
    odd: boolean;
    event: boolean;
    notValid : string;
    notInteger : string;
    notGreaterThan : string;
    notGreaterThanOrEqualTo : string;
    notEqualTo : string;
    notLessThan : string;
    notLessThanOrEqualTo : string;
    notDivisibleBy : string;
    notOdd : string;
    notEven : string;
    message: string;
}

type PresenceConstraintProps = {
    allowEmpty: boolean;
    message: string;
}

type URLConstraintProps = {
    schemes: string[];
    allowLocal: boolean;
    message: string;
}

export type DateConstraint = Partial<DateConstraintProps>;
export type DateTimeConstraint = Partial<DateConstraintProps>;
export type EmailConstraint = Partial<EmailConstraintProps>;
export type EqualityConstraint = Partial<EqualityConstraintProps>;
export type ExclusionConstraint = Partial<ExclusionConstraintProps>;
export type InclusionConstraint = Partial<InclusionConstraintProps>;
export type FormatConstraint = Partial<FormatConstraintProps>;
export type LengthConstraint = Partial<LengthConstraintProps>;
export type NumericalityConstraint = Partial<NumericalityConstraintProps>;
export type PresenceConstraint = Partial<PresenceConstraintProps>;
export type URLConstraint = Partial<URLConstraintProps>;

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
    {key: "date", label: "date", value: "date"},
    {key: "datetime", label: "datetime", value: "datetime"},
    {key: "email", label: "email", value: "email"},
    {key: "equality", label: "equality", value: "equality"},
    {key: "exclusion", label: "exclusion", value: "exclusion"},
    {key: "format", label: "format", value: "format"},
    {key: "inclusion", label: "inclusion", value: "inclusion"},
    {key: "length", label: "length", value: "length"},
    {key: "numericality", label: "numericality", value: "numericality"},
    {key: "presence", label: "presence", value: "presence"},
    {key: "url", label: "url", value: "url"}
];

export interface IValidationError {
    id: string,
    name: string,
    message: string,
    prefixedMessage: string,
    validator: string
}

export type ValidationRule = Partial<IValidationRule>;

