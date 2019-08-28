import { useObserver } from "mobx-react";
import * as React from "react";
const Cascader = React.lazy(() => import(/* webpackChunkName: "cascader" */ "antd/es/cascader").then((module) => { return { default: module.default }; }));
export const CascaderView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Cascader, Object.assign({}, component, { onChange: props.onChange })));
    });
};
