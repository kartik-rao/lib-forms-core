import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IStarRatingProps } from "../../models/field.properties";

const Rate = React.lazy(() => import(/* webpackChunkName: "starrating" */ "antd/es/rate"));
import { useObserver } from "mobx-react";

export const StarRatingView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as IStarRatingProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Rate {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};