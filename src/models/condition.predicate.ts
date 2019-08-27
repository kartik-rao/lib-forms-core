import { action, observable } from "mobx";
import { FormStoreType } from "../store/FormStore";

export interface IPredicate {
    uuid?: string;
    field: string;
    condition: any;
    value?: any;
    operator?: string;
}

export class Predicate implements IPredicate {
    static readonly PredicateConditions = ["eq",  "neq",  "gt",  "lt", "gteq", "lteq", "hasval", "nothasval"];
    static readonly PredicateOperators = ["or", "and"];
    uuid: string;
    @observable field: string;
    @observable condition: string;
    @observable value: any;
    @observable operator: string = "or";
    store: FormStoreType;

    @action initialize(data: IPredicate, store: FormStoreType) {
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

    constructor(data:IPredicate, store: FormStoreType) {
        this.initialize(data, store);
    }
}