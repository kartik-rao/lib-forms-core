import { useObserver } from "mobx-react";
import * as React from "react";
const Switch = React.lazy(() => import(/* webpackChunkName: "switch" */ "antd/es/switch"));
export const SwitchView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Switch, Object.assign({}, component, { onChange: props.onChange })));
    });
};
