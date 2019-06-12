import { Radio } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IRadioProps } from "../../models/field.properties";

@observer
export class RadioView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let {optionLabel, optionValue, defaultChecked, ...rest}  = field.componentProps as IRadioProps;
        return <Radio {...rest} onChange={onChange} defaultChecked={defaultChecked} value={optionValue}>{optionLabel}</Radio>
    }
}