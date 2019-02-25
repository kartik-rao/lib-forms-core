import { InputNumber } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { INumberProps } from "../../models/field.properties";

@observer
export class NumberView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field} = this.props;
        let component = field.componentProps as INumberProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-number-field">
            <InputNumber {...component}/>
        </div>
    }
}