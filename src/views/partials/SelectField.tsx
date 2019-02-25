import { Select } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {SelectProps} from "antd/lib/select/index";

export interface ISelectFieldProps extends SelectProps {
    id   : string,
    uuid : string,
    type?: string,
    onBlur: any,
    onChange: any
    placeholder?: string,
    defaultValue?: string,
    options: any[]
}

@observer
export class SelectField extends React.Component<ISelectFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-select-field">
            <Select onChange={props.onChange} onBlur={props.onBlur} defaultValue={props.defaultValue}>
                {props.options.map((option: any, index: number) => {
                    return <Select.Option key={props.id + "-option-"  + index} value={option.value}>{option.label}</Select.Option>
                })}
            </Select>
        </div>
    }
}