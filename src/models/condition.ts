import { action, computed, observable } from "mobx";
import { FormStoreType } from "../store/FormStore";
import { IPredicate, Predicate } from "./condition.predicate";

export interface ICondition {
    predicates: IPredicate[],
    ancestors?: string[],
}

export class Condition {
    @observable predicates: Predicate[];
    @observable ancestors?: string[];
    store: FormStoreType;

    @action initialize(data: ICondition, store: FormStoreType) {
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
    }

    constructor(data: ICondition, store: FormStoreType) {
        this.initialize(data, store);
    }

    @action addPredicates(...p : IPredicate[]) {
        p.forEach((p) => {
            this.predicates.push(new Predicate(p, this.store));
            this.ancestors.push(p.field);
        });
    }

    reduce(lhs:any, rhs:any, op: string) : boolean {
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