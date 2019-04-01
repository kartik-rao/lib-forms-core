import * as React from "react";
import { IFieldEditorView } from "./IFieldEditorView";
export declare class ValidationView extends React.Component<IFieldEditorView, any> {
    readonly dateFormat: string;
    ruleType: string;
    properties: any;
    isEditing: boolean;
    isAdding: boolean;
    constructor(props: IFieldEditorView);
    setRuleType(type: any): void;
    setRuleProperty(name: string, value: any): void;
    cancel(): void;
    readonly isRuleValid: boolean;
    applyRule: () => void;
    onEdit: (rule: string) => void;
    setIsAdding(isAdding: boolean): void;
    render(): JSX.Element;
}
