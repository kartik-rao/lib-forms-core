import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IInputProps } from '../../models/field.properties';

@observer
export class TextBlockView extends React.Component<IViewProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let {field} = this.props;
        let {defaultValue} = field.componentProps as IInputProps;
        return <p id={field.id} data-uuid={field.uuid}>{defaultValue}</p>
    }
}