import Predicate, {IPredicate} from "./condition.predicate";
import {action, decorate, observable, computed, reaction, observe, toJS} from "mobx";
import FormStore from "../state/FormStore";

export interface ICondition {
    predicates: any|Predicate[],
    ancestors?: string[],
}

class Condition {
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStore;

    @action initialize(data: ICondition, store: FormStore) {
        let predicates : Predicate[] = [];
        data.predicates.forEach((p: IPredicate)=> {
            predicates.push(new Predicate(p, store));
        })
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

    constructor(data: ICondition, store: FormStore) {
        this.initialize(data, store);
    }

    reduce(lhs:any, rhs:any, op: string) : boolean {
        console.log("Reduce", lhs, rhs, op)
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
    predicates: observable.shallow,
    ancestors: observable
});

export default Condition;