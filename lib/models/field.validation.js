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
var FieldValidationRule = /** @class */ (function () {
    function FieldValidationRule(props) {
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
    return FieldValidationRule;
}());
export { FieldValidationRule };
var FieldValidation = /** @class */ (function () {
    function FieldValidation() {
        this.rules = [];
    }
    FieldValidation.prototype.addRule = function (rule) {
        this.rules.push(new FieldValidationRule(rule));
    };
    FieldValidation.prototype.addRules = function (rules) {
        if (rules === void 0) { rules = []; }
        var self = this;
        rules.forEach(function (r) {
            self.addRule(r);
        });
        return this;
    };
    return FieldValidation;
}());
export { FieldValidation };
