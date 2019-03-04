import Predicate, { IPredicate } from "./condition.predicate";
import FormStore from "../state/FormStore";
export interface ICondition {
    predicates: IPredicate[];
    ancestors?: string[];
}
declare class Condition {
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStore;
    initialize(data: ICondition, store: FormStore): void;
    constructor(data: ICondition, store: FormStore);
    addPredicates(...p: IPredicate[]): void;
    reduce(lhs: any, rhs: any, op: string): boolean;
    readonly value: boolean;
}
export default Condition;
