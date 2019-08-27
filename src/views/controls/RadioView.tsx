import { useObserver } from "mobx-react";
import * as React from "react";
import { IRadioProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const Radio = React.lazy(() => import(/* webpackChunkName: "radio" */ "antd/es/radio"));
export const RadioView: React.FC<IViewProps> = (props) => {
    let {optionLabel, optionValue, defaultChecked, ...rest}  = props.field.componentProps as IRadioProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Radio {...rest} onChange={props.onChange} defaultChecked={defaultChecked} value={optionValue}>{optionLabel}</Radio>
    </React.Suspense>
    });
};