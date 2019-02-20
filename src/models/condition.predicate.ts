import {action, decorate, observable, computed} from "mobx";
import FormStore from "../state/FormStore";

export type PredicateCondition = "eq" | "neq" | "gt" | "lt" | "gteq" | "lteq" | "hasval" | "nothasval";
export type PredicateOperator = "or" | "and";

interface IPredicate {
    field: string;
    condition: PredicateCondition;
    value: any;
    operator?: PredicateOperator;
}

class Predicate implements IPredicate {
    field: string;
    condition: PredicateCondition;
    value: any;
    operator?: PredicateOperator = "or";

    @action initialize(data: IPredicate, store: FormStore) {
        this.field = data.field;
        this.condition = data.condition;
        this.value = data.value;
        this.operator = data.operator || "or";
    }

    constructor(data:IPredicate, store: FormStore) {
        this.initialize(data, store);
    }
}

decorate(Predicate, {
    field: observable,
    condition: observable,
    value: observable,
    operator: observable
});

export default Predicate;
