import { useObserver } from "mobx-react";
import * as React from "react";
import { IInputProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const Input = React.lazy(() => import(/* webpackChunkName: "input" */ "antd/es/input").then((module) => {return {default: module.default}}));

export const InputView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as IInputProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <Input {...component} defaultValue={component.defaultValue} onChange={props.onChange} onBlur={props.onBlur} hidden={props.field.isHidden}/>
    </React.Suspense>
    });
};