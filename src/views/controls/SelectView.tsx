import { Select } from 'antd';
import { useObserver } from "mobx-react";
import * as React from "react";
import { ISelectProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

export const SelectView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ISelectProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Select {...component} onChange={props.onChange} onBlur={props.onBlur}>
            {component.options && component.options.map((option: any, index: number) => {
                return <Select.Option key={props.field.id + "-option-"  + index} value={option.value}>{option.label}</Select.Option>
            })}
        </Select>
    </React.Suspense>
    });
};