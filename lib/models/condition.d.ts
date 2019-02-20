import Predicate from "./condition.predicate";
import FormStore from "../state/FormStore";
export interface ICondition {
    predicates: any | Predicate[];
    ancestors?: string[];
}
declare class Condition {
    predicates: Predicate[];
    ancestors?: string[];
    store: FormStore;
    initialize(data: ICondition, store: FormStore): void;
    constructor(data: ICondition, store: FormStore);
    reduce(lhs: any, rhs: any, op: string): boolean;
    readonly value: boolean;
}
export default Condition;
