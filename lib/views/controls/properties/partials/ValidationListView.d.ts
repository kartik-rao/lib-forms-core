import * as React from "react";
import ValidationRule from "../../../../models/validation";
export interface IValidationListViewProps {
    validation: ValidationRule;
    onRemove: (rule: string) => void;
    onEdit: (rule: string) => void;
}
export declare class ValidationListView extends React.Component<IValidationListViewProps, any> {
    constructor(props: IValidationListViewProps);
    render(): JSX.Element;
}
