import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";
export declare class ValidationView extends React.Component<IFieldEditorView, any> {
    readonly dateFormat: string;
    constructor(props: any);
    setRuleType(type: any): void;
    setRuleProperty(name: string, value: any): void;
    isRuleValid(): boolean;
    applyRule: () => void;
    onEdit: (rule: string) => void;
    render(): JSX.Element;
}
