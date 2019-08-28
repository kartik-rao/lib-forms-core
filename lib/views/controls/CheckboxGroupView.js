import { useObserver } from "mobx-react";
import * as React from "react";
const CheckboxGroup = React.lazy(() => import(/* webpackChunkName: "checkboxgroup" */ "antd/es/checkbox/Group").then((module) => { return { default: module.default }; }));
export const CheckboxGroupView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(CheckboxGroup, Object.assign({}, component, { onChange: props.onChange, options: component.options })));
    });
};
