import * as React from "react";
import { useObserver } from "mobx-react";
const Checkbox = React.lazy(() => import(/* webpackChunkName: "checkbox" */ "antd/es/checkbox").then((module) => { return { default: module.default }; }));
export const CheckboxView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Checkbox, Object.assign({}, component, { onChange: props.onChange })));
    });
};
