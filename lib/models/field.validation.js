import { valueOrDefault } from "./common";
export var FieldType;
(function (FieldType) {
    FieldType["string"] = "string";
    FieldType["number"] = "number";
    FieldType["boolean"] = "boolean";
    FieldType["method"] = "method";
    FieldType["regexp"] = "regexp";
    FieldType["integer"] = "integer";
    FieldType["float"] = "float";
    FieldType["array"] = "array";
    FieldType["object"] = "object";
    FieldType["enum"] = "enum";
    FieldType["date"] = "date";
    FieldType["url"] = "url";
    FieldType["hex"] = "hex";
    FieldType["email"] = "email"; // Must be of type email
})(FieldType || (FieldType = {}));
export class FieldValidationRule {
    constructor(props) {
        this.enum = props.enum;
        this.len = props.len;
        this.min = props.min;
        this.max = props.max;
        this.message = props.message;
        this.pattern = props.pattern;
        this.required = valueOrDefault(props.required, false);
        this.transform = props.transform;
        this.type = valueOrDefault(props.type, FieldType.string);
        this.validator = props.validator;
        this.whitespace = props.whitespace;
    }
}
export class FieldValidation {
    constructor() {
        this.rules = [];
    }
    addRule(rule) {
        this.rules.push(new FieldValidationRule(rule));
    }
    addRules(rules = []) {
        let self = this;
        rules.forEach((r) => {
            self.addRule(r);
        });
        return this;
    }
}
