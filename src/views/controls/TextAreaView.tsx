import { useObserver } from "mobx-react";
import * as React from "react";
import { ITextAreaProps } from "../../models/field.properties";
import { IViewProps } from "./IViewProps";

const TextArea = React.lazy(() => import(/* webpackChunkName: "textarea" */ "antd/es/input/TextArea"));

export const TextAreaView: React.FC<IViewProps> = (props) => {
    let component = props.field.componentProps as ITextAreaProps;
    return useObserver(() => {
        return <React.Suspense fallback="">
        <TextArea {...component} onChange={props.onChange}/>
    </React.Suspense>
    });
};