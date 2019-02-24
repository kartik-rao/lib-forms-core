import * as React from "react";
import Field from "../models/field";
import FormStore from "../state/FormStore";
export interface IFieldProps {
    field: Field;
    store: FormStore;
}
export declare class FieldView extends React.Component<IFieldProps, any> {
    props: IFieldProps;
    constructor(props: IFieldProps);
    render(): JSX.Element;
}
