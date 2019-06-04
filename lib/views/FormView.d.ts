import * as React from "react";
import FormStore from "../store/FormStore";
interface FormComponentProps {
    store: FormStore;
}
export declare class FormView extends React.Component<FormComponentProps, any> {
    props: FormComponentProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
