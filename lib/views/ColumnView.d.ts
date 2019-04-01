import * as React from "react";
import Column from "../models/column";
import FormStore from "../store/FormStore";
export interface ColumnProps {
    column: Column;
    store: FormStore;
    span: number;
}
export declare class ColumnView extends React.Component<ColumnProps, any> {
    props: ColumnProps;
    constructor(props: ColumnProps);
    render(): JSX.Element;
}
