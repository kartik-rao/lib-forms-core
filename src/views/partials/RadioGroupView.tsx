import { Radio } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { IRadioGroupProps } from "../../models/field.properties";

@observer
export class RadioGroupView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as IRadioGroupProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-radiogroup-field">
            <Radio.Group onChange={onChange}  defaultValue={component.defaultValue} options={component.options}/>
        </div>
    }
}