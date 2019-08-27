import { useObserver } from "mobx-react";
import * as React from "react";
import { IInputProps } from '../../models/field.properties';
import { IViewProps } from "./IViewProps";

export const TextBlockView: React.FC<IViewProps> = (props) => {
    let {field} = props;
    let {defaultValue} = field.componentProps as IInputProps;
    return useObserver(() => {
        return <p id={props.field.id} data-uuid={props.field.uuid}>{defaultValue}</p>
    });
};