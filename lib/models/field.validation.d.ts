export declare enum FieldType {
    string = "string",
    number = "number",
    boolean = "boolean",
    method = "method",
    regexp = "regexp",
    integer = "integer",
    float = "float",
    array = "array",
    object = "object",
    enum = "enum",
    date = "date",
    url = "url",
    hex = "hex",
    email = "email"
}
export interface IFieldValidationRule {
    name: string;
    value: any;
    message: string;
}
export declare class FieldValidationRule implements IFieldValidationRule {
    name: string;
    value: any;
    message: string;
    constructor(props: any);
}
export declare class FieldValidation {
    rules: FieldValidationRule[];
    addRule(rule: any): void;
    addRules(rules?: any[]): FieldValidation;
}
