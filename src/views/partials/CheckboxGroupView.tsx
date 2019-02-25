import { Checkbox } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ICheckboxGroupProps } from "../../models/field.properties";

@observer
export class CheckboxGroupView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange, onBlur} = this.props;
        let component = field.componentProps as ICheckboxGroupProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-checkboxgroup-field">
            <Checkbox.Group {...component} onChange={onChange}  options={component.options}/>
        </div>
    }
}