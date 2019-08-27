import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ICheckboxProps} from "../../models/field.properties";
import { useObserver } from "mobx-react";

const Checkbox = React.lazy(() => import(/* webpackChunkName: "checkbox" */ "antd/es/checkbox").then((module) => {return {default: module.default}}));

export const CheckboxView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ICheckboxProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Checkbox {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};