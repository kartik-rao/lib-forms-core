import * as tslib_1 from "tslib";
import { useObserver } from "mobx-react";
import * as React from "react";
const Radio = React.lazy(() => import(/* webpackChunkName: "radio" */ "antd/es/radio"));
export const RadioView = (props) => {
    let _a = props.field.componentProps, { optionLabel, optionValue, defaultChecked } = _a, rest = tslib_1.__rest(_a, ["optionLabel", "optionValue", "defaultChecked"]);
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Radio, Object.assign({}, rest, { onChange: props.onChange, defaultChecked: defaultChecked, value: optionValue }), optionLabel));
    });
};
