import * as React from "react";
const Rate = React.lazy(() => import(/* webpackChunkName: "starrating" */ "antd/es/rate"));
import { useObserver } from "mobx-react";
export const StarRatingView = (props) => {
    let component = props.field.componentProps;
    return useObserver(() => {
        return React.createElement(React.Suspense, { fallback: "" },
            React.createElement(Rate, Object.assign({}, component, { onChange: props.onChange })));
    });
};
