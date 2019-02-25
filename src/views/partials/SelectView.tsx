import { Select } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ISelectProps } from "../../models/field.properties";

@observer
export class SelectView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onBlur, onChange} = this.props;
        let component = field.componentProps as ISelectProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-select-field">
            <Select onChange={onChange} onBlur={onBlur} defaultValue={component.defaultValue}>
                {component.options.map((option: any, index: number) => {
                    return <Select.Option key={field.id + "-option-"  + index} value={option.value}>{option.label}</Select.Option>
                })}
            </Select>
        </div>
    }
}