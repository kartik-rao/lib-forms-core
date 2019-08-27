import { useObserver } from "mobx-react";
import * as React from "react";
import { IRadioGroupProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const RadioGroup = React.lazy(() => import(/* webpackChunkName: "radiogroup" */ "antd/es/radio/group"));
export const RadioGroupView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as IRadioGroupProps;
    let handleChange = (e) => {e && e.target ? props.onChange(e.target.value) : null};
    return useObserver(() => {
        return <React.Suspense fallback="">
        <RadioGroup onChange={handleChange}  defaultValue={component.defaultValue} options={component.options}/>
    </React.Suspense>
    });
};