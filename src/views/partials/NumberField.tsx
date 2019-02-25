import { InputNumber } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {InputNumberProps} from "antd/lib/input-number/index"

export interface INumberFieldProps extends InputNumberProps {
    id   : string,
    uuid : string,
    type?: string,
    onBlur: any,
    onChange: any
    placeholder?: string,
    defaultValue?: number
}

@observer
export class NumberField extends React.Component<INumberFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-number-field">
            <InputNumber {...props} defaultValue={props.defaultValue}/>
        </div>
    }
}