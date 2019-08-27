import { useObserver } from "mobx-react";
import * as React from "react";
import { ISwitchProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const Switch = React.lazy(() => import(/* webpackChunkName: "switch" */ "antd/es/switch"));

export const SwitchView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ISwitchProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Switch {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};