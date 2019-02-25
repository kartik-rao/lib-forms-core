import { Checkbox } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {CheckboxGroupProps} from "antd/lib/checkbox/index";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

export interface ICheckboxGroupFieldProps extends CheckboxGroupProps {
    id   : string,
    uuid : string,
    type?: string,
    onChange: any
    placeholder?: string,
    defaultValue?: CheckboxValueType[],
    options: any[]
}

@observer
export class CheckboxGroupField extends React.Component<ICheckboxGroupFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-checkboxgroup-field">
            <Checkbox.Group onChange={props.onChange}  defaultValue={props.defaultValue} options={props.options}/>
        </div>
    }
}