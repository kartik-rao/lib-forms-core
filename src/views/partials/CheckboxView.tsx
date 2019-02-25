import { Checkbox } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ICheckboxProps} from "../../models/field.properties";

@observer
export class CheckboxView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ICheckboxProps;
        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-checkbox-field">
            <Checkbox {...component} onChange={onChange}/>
         </div>
    }
}