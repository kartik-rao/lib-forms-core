import { useObserver } from "mobx-react";
import * as React from "react";
const Transfer = React.lazy(() => import(/* webpackChunkName: "transfer" */ "antd/es/transfer"));
export const TransferView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Transfer, Object.assign({}, component, { onChange: props.onChange, render: (item) => item.title })));
    });
};
