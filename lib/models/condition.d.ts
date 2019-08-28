import { FormStoreType } from "../store/FormStore";
import { IPredicate, Predicate } from "./condition.predicate";
export interface ICondition {
    predicates: IPredicate[];
    ancestors?: string[];
}
export declare class Condition {
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStoreType;
    initialize(data: ICondition, store: FormStoreType): void;
    constructor(data: ICondition, store: FormStoreType);
    addPredicates(...p: IPredicate[]): void;
    reduce(lhs: any, rhs: any, op: string): boolean;
    readonly value: boolean;
}
