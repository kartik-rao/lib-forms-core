import { FormStore } from "../store/FormStore";
import { IPredicate, Predicate } from "./condition.predicate";
export interface ICondition {
    predicates: IPredicate[];
    ancestors?: string[];
}
export declare class Condition {
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStore;
    initialize(data: ICondition, store: FormStore): void;
    constructor(data: ICondition, store: FormStore);
    addPredicates(...p: IPredicate[]): void;
    reduce(lhs: any, rhs: any, op: string): boolean;
    readonly value: boolean;
}
