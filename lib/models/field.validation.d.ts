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
    enum?: string;
    len?: number;
    max?: number;
    message: string;
    min?: number;
    pattern?: RegExp;
    required: boolean;
    transform?: any;
    type?: FieldType;
    validator?: (rule: any, value: any, callback: any) => void;
    whitespace?: boolean;
}
export declare class FieldValidationRule implements IFieldValidationRule {
    enum?: string;
    len?: number;
    max?: number;
    message: string;
    min?: number;
    pattern?: RegExp;
    required: boolean;
    transform?: any;
    type: FieldType;
    validator?: (rule: any, value: any, callback: any) => void;
    whitespace?: boolean;
    constructor(props: any);
}
export declare class FieldValidation {
    rules: FieldValidationRule[];
    addRule(rule: any): void;
    addRules(rules?: any[]): FieldValidation;
}
