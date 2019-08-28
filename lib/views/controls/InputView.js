import { useObserver } from "mobx-react";
import * as React from "react";
const Input = React.lazy(() => import(/* webpackChunkName: "input" */ "antd/es/input").then((module) => { return { default: module.default }; }));
export const InputView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Input, Object.assign({}, component, { defaultValue: component.defaultValue, onChange: props.onChange, onBlur: props.onBlur, hidden: props.field.isHidden })));
    });
};
