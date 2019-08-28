import * as React from "react";
const Slider = React.lazy(() => import(/* webpackChunkName: "slider" */ "antd/es/slider"));
import { useObserver } from "mobx-react";
export const SliderView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Slider, Object.assign({}, component, { onChange: props.onChange })));
    });
};
