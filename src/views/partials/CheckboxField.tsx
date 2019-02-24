import { Checkbox } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {CheckboxProps} from "antd/lib/checkbox/Checkbox";

interface ICheckboxFieldProps extends CheckboxProps {
    id   : string,
    uuid : string,
    onChange: any
}

@observer
export class CheckboxField extends React.Component<ICheckboxFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-checkbox-field">
            <Checkbox {...props} defaultChecked={props.defaultChecked} onChange={props.onChange}/>
         </div>
    }
}