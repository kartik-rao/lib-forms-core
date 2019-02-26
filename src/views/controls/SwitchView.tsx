import { Switch } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ISwitchProps } from "../../models/field.properties";

@observer
export class SwitchView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ISwitchProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-switch-field">
            <Switch {...component} onChange={onChange}/>
         </div>
    }
}