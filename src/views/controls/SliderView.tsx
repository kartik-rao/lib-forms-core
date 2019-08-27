import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ISliderProps } from "../../models/field.properties";

const Slider = React.lazy(() => import(/* webpackChunkName: "slider" */ "antd/es/slider"));
import { useObserver } from "mobx-react";

export const SliderView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ISliderProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Slider {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};