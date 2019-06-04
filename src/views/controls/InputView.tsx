import { Input } from "antd";
import {observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import {IInputProps } from "../../models/field.properties";

@observer
export class InputView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange, onBlur} = this.props;
        let component = field.componentProps as IInputProps;

        return <Input {...component} defaultValue={component.defaultValue} onChange={onChange} onBlur={onBlur} hidden={field.isHidden}/>
    }
}