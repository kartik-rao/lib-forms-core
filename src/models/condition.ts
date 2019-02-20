import Predicate from "./condition.predicate";
import {PredicateOperator} from "./condition.predicate";
import {action, decorate, observable, computed, observe, toJS} from "mobx";
import FormStore from "../state/FormStore";

export interface ICondition {
    fieldId: string,
    predicates: Predicate[],
    ancestors?: string[],
}

class Condition {
    fieldId: string;
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStore;

    @action initialize(data: ICondition, store: FormStore) {
        this.fieldId = data.fieldId;
        this.predicates = data.predicates;
        this.ancestors = [];
        this.store = store;
        let self = this;

        this.predicates.forEach((p, i) => {
            self.ancestors.push(p.field);
        });

        observe(store, "values", (change) => {
            console.log("condition - store value changed", toJS(change.newValue));
        }, true);
    }

    constructor(data: ICondition, store: FormStore) {
        this.initialize(data, store)
        this.fieldId = data.fieldId;
        this.predicates = data.predicates || [];
        let self = this;
        this.predicates.forEach((p, i) => {
            self.ancestors.push(p.field);
        });
    }

    reduce(lhs:any, rhs:any, op: PredicateOperator) : boolean {
        if (op == 'and') {
            return lhs && rhs;
        } else {
            return lhs || rhs;
        }
    }

    @computed get value() : boolean {
        var state: boolean;
        let self = this;

        if (!this.predicates || this.predicates.length == 0){
            return true;
        }

        this.predicates.forEach((p, i) => {
            let currentValue = self.store.values[p.field];
            var result: any = null;
            switch(p.condition) {
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
                    result = typeof(currentValue) != 'undefined' && currentValue != null && currentValue !== "";
                    break;
                case "nothasval":
                    result = typeof(currentValue) == 'undefined' || currentValue == null || currentValue == "";
                    break;
                default:
                    result = false;
            }
            state = (i == 0) ? result : this.reduce(state, result, p.operator);
        });
        return state;
    }
}

decorate(Condition, {
    fieldId: observable,
    predicates: observable.shallow,
    ancestors: observable
});

export default Condition;