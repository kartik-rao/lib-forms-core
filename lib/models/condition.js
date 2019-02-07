var Predicate = /** @class */ (function () {
    function Predicate(field, condition, value, operator) {
        this.operator = "or";
        this.field = field;
        this.condition = condition;
        this.value = value;
        this.operator = operator;
    }
    return Predicate;
}());
export { Predicate };
var Condition = /** @class */ (function () {
    function Condition(fieldId, predicates) {
        if (predicates === void 0) { predicates = []; }
        this.predicates = [];
        this.ancestors = [];
        this.fieldId = fieldId;
        this.predicates = predicates;
        var self = this;
        this.predicates.forEach(function (p, i) {
            self.ancestors.push(p.field);
        });
    }
    Condition.prototype.reduce = function (lhs, rhs, op) {
        if (op == 'and') {
            return lhs && rhs;
        }
        else {
            return lhs || rhs;
        }
    };
    Condition.prototype.value = function (form) {
        var _this = this;
        var state;
        var fieldId = this.fieldId;
        if (!this.predicates || this.predicates.length == 0) {
            return true;
        }
        this.predicates.forEach(function (p, i) {
            var currentValue = form.getFieldValue(p.field);
            var result = null;
            switch (p.condition) {
                case "eq":
                    result = currentValue == p.value;
                    break;
                case "neq":
                    result = currentValue != p.value;
                    break;
                case "gt":
                    result = currentValue > p.value;
                    break;
                case "lt":
                    result = currentValue < p.value;
                    break;
                case "gteq":
                    result = currentValue >= p.value;
                    break;
                case "lteq":
                    result = currentValue <= p.value;
                    break;
                case "hasval":
                    result = typeof (currentValue) != 'undefined' && currentValue != null && currentValue !== "";
                    break;
                case "nothasval":
                    result = typeof (currentValue) == 'undefined' || currentValue == null || currentValue == "";
                    break;
                default:
                    result = false;
            }
            state = (i == 0) ? result : _this.reduce(state, result, p.operator);
            console.log("Condition " + i + " on [" + fieldId + "] is " + state + ", rule [" + p.field + " " + p.condition + " " + p.value + "] (value is [" + currentValue + "])");
        });
        return state;
    };
    return Condition;
}());
export { Condition };
