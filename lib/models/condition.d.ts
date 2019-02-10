export declare type PredicateCondition = "eq" | "neq" | "gt" | "lt" | "gteq" | "lteq" | "hasval" | "nothasval";
export declare type PredicateOperator = "or" | "and";
export declare class Predicate {
    field: string;
    condition: PredicateCondition;
    value: any;
    operator: PredicateOperator;
    constructor(field: string, condition: PredicateCondition, value?: any, operator?: any);
}
export declare class Condition {
    fieldId: string;
    predicates: Predicate[];
    ancestors: string[];
    constructor(fieldId: string, predicates?: Predicate[]);
    reduce(lhs: any, rhs: any, op: PredicateOperator): boolean;
    value(valueAccessor: any): boolean;
}
