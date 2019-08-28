import { useObserver } from "mobx-react";
import * as React from "react";
const TextArea = React.lazy(() => import(/* webpackChunkName: "textarea" */ "antd/es/input/TextArea"));
export const TextAreaView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(TextArea, Object.assign({}, component, { onChange: props.onChange })));
    });
};
