interface BaseConstraintProps {
    message: string;
}

interface EmailConstraintProps extends BaseConstraintProps {

}

interface DateConstraintProps extends BaseConstraintProps {
    earliest?: string;
    latest?  :string;
    dateOnly?: boolean;
    notValid: string,
    tooEarly: string,
    tooLate : string
}

// Validator will expect value to be present in values object with key of attribute
interface EqualityConstraintProps extends BaseConstraintProps {
    attribute : string;
    comparator?: any
}

interface ExclusionConstraintProps extends BaseConstraintProps {
    within: any|string[];
}

interface InclusionConstraintProps extends BaseConstraintProps {
    within: any|string[];
}

interface FormatConstraintProps extends BaseConstraintProps {
    pattern: string
    flags?: string

}

interface LengthConstraintProps extends BaseConstraintProps {
    is : number,
    minimum: number
    maximum: number,
    notValid: string,
    tooLong: string,
    tooShort: string,
    wrongLength: string,
    tokenizer: any;
}

interface NumericalityConstraintProps extends BaseConstraintProps {
    onlyInteger: boolean,
    strict: boolean,
    greaterThan: number,
    greaterThanOrEqualTo: number,
    equalTo: number,
    lessThanOrEqualTo: number,
    lessThan: number,
    divisibleBy: number,
    odd: boolean,
    event: boolean,
    notValid : string,
    notInteger : string,
    notGreaterThan : string,
    notGreaterThanOrEqualTo : string,
    notEqualTo : string,
    notLessThan : string,
    notLessThanOrEqualTo : string,
    notDivisibleBy : string,
    notOdd : string,
    notEven : string
}

interface PresenceConstraintProps extends BaseConstraintProps {
    allowEmpty: boolean;
}

interface URLConstraintProps extends BaseConstraintProps {
    schemes: string[],
    allowLocal: boolean
}

export type DateConstraint = Partial<Record<keyof DateConstraintProps, string>>;
export type DateTimeConstraint = Partial<Record<keyof DateConstraintProps, string>>;
export type EmailConstraint = Partial<Record<keyof EmailConstraintProps, string>>;
export type EqualityConstraint = Partial<Record<keyof EqualityConstraintProps, string>>;
export type ExclusionConstraint = Partial<Record<keyof ExclusionConstraintProps, string>>;
export type InclusionConstraint = Partial<Record<keyof InclusionConstraintProps, string>>;
export type FormatConstraint = Partial<Record<keyof FormatConstraintProps, string>>;
export type LengthConstraint = Partial<Record<keyof LengthConstraintProps, string>>;
export type NumericalityConstraint = Partial<Record<keyof NumericalityConstraintProps, string>>;
export type PresenceConstraint = Partial<Record<keyof NumericalityConstraintProps, string>>;
export type URLConstraint = Partial<Record<keyof URLConstraintProps, string>>;

export interface IValidationRule {
    date? : any,
    datetime? : any,
    email?: any,
    equality?: any,
    exclusion?: any,
    format?: any,
    inclusion?: any,
    length?: any,
    numericality?: any,
    presence?: any,
    url?: any
}

export interface IValidationError {
    // id: string,
    name: string,
    message: string,
    prefixedMessage: string,
    validator: string
}

export type ValidationRule = Partial<Record<keyof IValidationRule, string>>;

