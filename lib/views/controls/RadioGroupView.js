import { useObserver } from "mobx-react";
import * as React from "react";
const RadioGroup = React.lazy(() => import(/* webpackChunkName: "radiogroup" */ "antd/es/radio/group"));
export const RadioGroupView = (props) => {
    let component = props.field.componentProps;
    let handleChange = (e) => { e && e.target ? props.onChange(e.target.value) : null; };
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(RadioGroup, { onChange: handleChange, defaultValue: component.defaultValue, options: component.options }));
    });
};
