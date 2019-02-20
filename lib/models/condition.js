var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        // observe(store, "values", (change) => {
        //     console.log("condition - store value changed", toJS(change.newValue));
        // }, true);
    }
    reduce(lhs, rhs, op) {
        console.log("Reduce", lhs, rhs, op);
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
__decorate([
    action
], Condition.prototype, "initialize", null);
__decorate([
    computed
], Condition.prototype, "value", null);
decorate(Condition, {
    predicates: observable.shallow,
    ancestors: observable
});
export default Condition;
