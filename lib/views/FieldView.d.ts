import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";
export interface IFieldViewProps {
    field: Field;
    store: FormStore;
}
export declare class FieldView extends React.Component<IFieldViewProps, any> {
    props: IFieldViewProps;
    constructor(props: IFieldViewProps);
    render(): JSX.Element;
}
