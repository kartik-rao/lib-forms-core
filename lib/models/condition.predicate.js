import * as tslib_1 from "tslib";
import { action, decorate, observable } from "mobx";
class Predicate {
    constructor(data, store) {
        this.operator = "or";
        this.initialize(data, store);
    }
    initialize(data, store) {
        if (!data.condition || Predicate.PredicateConditions.indexOf(data.condition) == -1) {
            throw new Error(`InvalidPredicateCondition - ${data.condition}`);
        }
        if (data.operator && Predicate.PredicateOperators.indexOf(data.operator) == -1) {
            throw new Error(`InvalidPredicateOperator - ${data.operator}`);
        }
        this.uuid = data.uuid;
        this.store = store;
        this.field = data.field;
        this.condition = data.condition;
        this.value = data.value;
        this.operator = data.operator;
    }
}
Predicate.PredicateConditions = ["eq", "neq", "gt", "lt", "gteq", "lteq", "hasval", "nothasval"];
Predicate.PredicateOperators = ["or", "and"];
tslib_1.__decorate([
    action
], Predicate.prototype, "initialize", null);
decorate(Predicate, {
    field: observable,
    condition: observable,
    value: observable,
    operator: observable
});
export default Predicate;
