import { useObserver } from "mobx-react";
import * as React from "react";
import { INumberProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const InputNumber = React.lazy(() => import(/* webpackChunkName: "number" */ "antd/es/input-number"));

export const NumberView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as INumberProps;
    let handleChange = (e) => {!!e ? props.onChange(parseInt(e)) : void(0)};
    return useObserver(() => {
        return <React.Suspense fallback="">
        <InputNumber {...component} onChange={handleChange} onBlur={props.onBlur}/>
    </React.Suspense>
    });
};