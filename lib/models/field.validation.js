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
        this.name = props.name;
        this.value = props.value;
        this.message = props.message;
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
