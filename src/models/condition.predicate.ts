import {action, decorate, observable, computed} from "mobx";
import FormStore from "../state/FormStore";

export interface IPredicate {
    uuid?: string;
    field: string;
    condition: any;
    value: any;
    operator?: string;
}

class Predicate implements IPredicate {
    static readonly PredicateConditions = ["eq",  "neq",  "gt",  "lt", "gteq", "lteq", "hasval", "nothasval"];
    static readonly PredicateOperators = ["or", "and"];
    uuid: string;
    field: string;
    condition: string;
    value: any;
    operator: string = "or";
    store: FormStore;

    @action initialize(data: IPredicate, store: FormStore) {
        if (!data.condition || Predicate.PredicateConditions.indexOf(data.condition) == -1) {
            throw new Error(`InvalidPredicateCondition - ${data.condition}`);
        }
        if(data.operator && Predicate.PredicateOperators.indexOf(data.operator) == -1) {
            throw new Error(`InvalidPredicateOperator - ${data.operator}`);
        }
        this.uuid = data.uuid;
        this.store = store;
        this.field = data.field;
        this.condition = data.condition;
        this.value = data.value;
        this.operator = data.operator;
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
