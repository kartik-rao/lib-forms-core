var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
__decorate([
    action
], Predicate.prototype, "initialize", null);
decorate(Predicate, {
    field: observable,
    condition: observable,
    value: observable,
    operator: observable
});
export default Predicate;
