import * as React from "react";
import { IPredicate } from "../../../models/condition.predicate";
import { IFieldEditorView } from "./IFieldEditorView";
export declare class ConditionsView extends React.Component<IFieldEditorView, any> {
    constructor(props: any);
    setField: (e: any) => void;
    setExpression: (e: any) => void;
    setValue: (e: any) => void;
    setOperator: (e: any) => void;
    addPredicate(p: IPredicate): void;
    removePredicate(uuid: string): void;
    handleSubmit: (e: any) => void;
    render(): JSX.Element;
}
