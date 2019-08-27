import { useObserver } from "mobx-react";
import * as React from "react";
import { ICheckboxGroupProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const CheckboxGroup = React.lazy(() => import(/* webpackChunkName: "checkboxgroup" */ "antd/es/checkbox/Group").then((module) => {return {default: module.default}}));

export const CheckboxGroupView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ICheckboxGroupProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
         <CheckboxGroup {...component} onChange={props.onChange} options={component.options}/>
    </React.Suspense>
    });
};