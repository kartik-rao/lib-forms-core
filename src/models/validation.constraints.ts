export type EmailConstraintProps = {
    message: string;
}

export type DateConstraintProps = {
    earliest?: string;
    latest?  :string;
    dateOnly?: boolean;
    notValid: string;
    tooEarly: string;
    tooLate : string;
    message: string;
}

// Validator will expect value to be present in values object with key of attribute
export type EqualityConstraintProps = {
    attribute : string;
    comparator?: any;
    message: string;
}

export type ExclusionConstraintProps = {
    within: any|string[];
    message: string;
}

export type InclusionConstraintProps = {
    within: any|string[];
    message: string;
}

export type FormatConstraintProps = {
    pattern: string;
    flags?: string;
    message: string;
}

export type LengthConstraintProps = {
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

export type NumericalityConstraintProps = {
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

export type PresenceConstraintProps = {
    allowEmpty: boolean;
    message: string;
}

export type URLConstraintProps = {
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

export type GenericConstraint = DateConstraint|DateTimeConstraint|EmailConstraint|EqualityConstraint|
                                ExclusionConstraint|InclusionConstraint|FormatConstraint|LengthConstraint|
                                NumericalityConstraint|PresenceConstraint|URLConstraint;