import * as React from "react";
import { IPredicate } from "../../../models/condition.predicate";
import { IFieldEditorView } from "./IFieldEditorView";
export declare class ConditionsView extends React.Component<IFieldEditorView, any> {
    field: string;
    expression: string;
    value: string;
    operator: string;
    isAdding: boolean;
    constructor(props: any);
    setField: (e: any) => void;
    setExpression: (e: any) => void;
    setValue: (e: any) => void;
    setOperator: (e: any) => void;
    addPredicate(p: IPredicate): void;
    removePredicate(uuid: string): void;
    cancel(): void;
    handleSubmit: (e: any) => void;
    setIsAdding(value: boolean): void;
    render(): JSX.Element;
}
