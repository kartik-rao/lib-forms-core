export enum FieldType {
    string = "string", // Must be of type string. This is the default type.
    number = "number", // Must be of type number.
    boolean = "boolean", // Must be of type boolean.
    method = "method", // Must be of type function.
    regexp = "regexp", // Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
    integer = "integer", // Must be of type number and an integer.
    float = "float", // Must be of type number and a floating point number.
    array = "array", // Must be an array as determined by Array.isArray.
    object = "object", // Must be of type object and not Array.isArray.
    enum = "enum", // Value must exist in the enum.
    date = "date", // Value must be valid as determined by Date
    url = "url", // Must be of type url.
    hex = "hex", // Must be of type hex.
    email = "email" // Must be of type email
}

export interface IFieldValidationRule {
    name: string;
    value: any;
    message: string;
}

export class FieldValidationRule implements IFieldValidationRule {
    name: string;
    value: any;
    message: string;

    constructor(props: any) {
        this.name = props.name;
        this.value = props.value;
        this.message = props.message;
    }
}

export class FieldValidation {
    public rules: FieldValidationRule[] = [];

    addRule(rule: any) : void {
        this.rules.push(new FieldValidationRule(rule))
    }

    addRules(rules: any[] = []) : FieldValidation {
        let self = this;
        rules.forEach((r) => {
            self.addRule(r);
        });
        return this;
    }
}