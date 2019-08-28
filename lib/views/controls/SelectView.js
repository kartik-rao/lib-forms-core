import { Select } from 'antd';
import { useObserver } from "mobx-react";
import * as React from "react";
export const SelectView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Select, Object.assign({}, component, { onChange: props.onChange, onBlur: props.onBlur }), component.options && component.options.map((option, index) => {
                return React.createElement(Select.Option, { key: props.field.id + "-option-" + index, value: option.value }, option.label);
            })));
    });
};
