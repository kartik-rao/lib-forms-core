export declare type EmailConstraintProps = {
    message: string;
};
export declare type DateConstraintProps = {
    earliest?: string;
    latest?: string;
    dateOnly?: boolean;
    notValid: string;
    tooEarly: string;
    tooLate: string;
    message: string;
};
export declare type EqualityConstraintProps = {
    attribute: string;
    comparator?: any;
    message: string;
};
export declare type ExclusionConstraintProps = {
    within: any | string[];
    message: string;
};
export declare type InclusionConstraintProps = {
    within: any | string[];
    message: string;
};
export declare type FormatConstraintProps = {
    pattern: string;
    flags?: string;
    message: string;
};
export declare type LengthConstraintProps = {
    is: number;
    minimum: number;
    maximum: number;
    notValid: string;
    tooLong: string;
    tooShort: string;
    wrongLength: string;
    tokenizer: any;
    message: string;
};
export declare type NumericalityConstraintProps = {
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
    notValid: string;
    notInteger: string;
    notGreaterThan: string;
    notGreaterThanOrEqualTo: string;
    notEqualTo: string;
    notLessThan: string;
    notLessThanOrEqualTo: string;
    notDivisibleBy: string;
    notOdd: string;
    notEven: string;
    message: string;
};
export declare type PresenceConstraintProps = {
    allowEmpty: boolean;
    message: string;
};
export declare type URLConstraintProps = {
    schemes: string[];
    allowLocal: boolean;
    message: string;
};
export declare type DateConstraint = Partial<DateConstraintProps>;
export declare type DateTimeConstraint = Partial<DateConstraintProps>;
export declare type EmailConstraint = Partial<EmailConstraintProps>;
export declare type EqualityConstraint = Partial<EqualityConstraintProps>;
export declare type ExclusionConstraint = Partial<ExclusionConstraintProps>;
export declare type InclusionConstraint = Partial<InclusionConstraintProps>;
export declare type FormatConstraint = Partial<FormatConstraintProps>;
export declare type LengthConstraint = Partial<LengthConstraintProps>;
export declare type NumericalityConstraint = Partial<NumericalityConstraintProps>;
export declare type PresenceConstraint = Partial<PresenceConstraintProps>;
export declare type URLConstraint = Partial<URLConstraintProps>;
export declare type GenericConstraint = DateConstraint | DateTimeConstraint | EmailConstraint | EqualityConstraint | ExclusionConstraint | InclusionConstraint | FormatConstraint | LengthConstraint | NumericalityConstraint | PresenceConstraint | URLConstraint;
