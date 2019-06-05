import * as tslib_1 from "tslib";
import Predicate from "./condition.predicate";
import { action, decorate, observable, computed } from "mobx";
class Condition {
    constructor(data, store) {
        this.initialize(data, store);
    }
    initialize(data, store) {
        let predicates = [];
        data.predicates.forEach((p) => {
            predicates.push(new Predicate(p, store));
        });
        this.predicates = predicates;
        this.ancestors = [];
        this.store = store;
        let self = this;
        this.predicates.forEach((p) => {
            self.ancestors.push(p.field);
        });
    }
    addPredicates(...p) {
        p.forEach((p) => {
            this.predicates.push(new Predicate(p, this.store));
            this.ancestors.push(p.field);
        });
    }
    reduce(lhs, rhs, op) {
        if (op == 'and') {
            return lhs && rhs;
        }
        else {
            return lhs || rhs;
        }
    }
    get value() {
        var state;
        let self = this;
        if (!this.predicates || this.predicates.length == 0) {
            return true;
        }
        this.predicates.forEach((p, i) => {
            let currentValue = self.store.values[p.field];
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
            state = (i == 0) ? result : this.reduce(state, result, p.operator);
        });
        return state;
    }
}
tslib_1.__decorate([
    action
], Condition.prototype, "initialize", null);
tslib_1.__decorate([
    action
], Condition.prototype, "addPredicates", null);
tslib_1.__decorate([
    computed
], Condition.prototype, "value", null);
decorate(Condition, {
    predicates: observable,
    ancestors: observable
});
export default Condition;
