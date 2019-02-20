import FormStore from "../state/FormStore";
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
declare class FieldValidation {
    store: FormStore;
    rules: FieldValidationRule[];
    addRule(rule: any): void;
    addRules(rules?: any[]): FieldValidation;
    readonly isValid: boolean;
    initialize(store: FormStore): void;
    constructor(store: FormStore);
}
export default FieldValidation;
