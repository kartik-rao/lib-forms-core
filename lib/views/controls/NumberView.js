import { useObserver } from "mobx-react";
import * as React from "react";
const InputNumber = React.lazy(() => import(/* webpackChunkName: "number" */ "antd/es/input-number"));
export const NumberView = (props) => {
    let component = props.field.componentProps;
    let handleChange = (e) => { !!e ? props.onChange(parseInt(e)) : void (0); };
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(InputNumber, Object.assign({}, component, { onChange: handleChange, onBlur: props.onBlur })));
    });
};
