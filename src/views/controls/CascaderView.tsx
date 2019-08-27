import { useObserver } from "mobx-react";
import * as React from "react";
import { ICascaderProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const Cascader = React.lazy(() => import(/* webpackChunkName: "cascader" */ "antd/es/cascader").then((module) => {return {default: module.default}}));

export const CascaderView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ICascaderProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Cascader {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};