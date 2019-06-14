import { FormStore } from "../store/FormStore";
export interface IPredicate {
    uuid?: string;
    field: string;
    condition: any;
    value?: any;
    operator?: string;
}
export declare class Predicate implements IPredicate {
    static readonly PredicateConditions: string[];
    static readonly PredicateOperators: string[];
    uuid: string;
    field: string;
    condition: string;
    value: any;
    operator: string;
    store: FormStore;
    initialize(data: IPredicate, store: FormStore): void;
    constructor(data: IPredicate, store: FormStore);
}
