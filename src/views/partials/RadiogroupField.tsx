import { Radio } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {RadioGroupProps} from "antd/lib/radio/index";

export interface IRadioGroupFieldProps extends RadioGroupProps {
    id   : string,
    uuid : string,
    type?: string,
    onChange: any
    placeholder?: string,
    defaultValue?: any,
    options: any[]
}

@observer
export class RadioGroupField extends React.Component<IRadioGroupFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;
        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-radiogroup-field">
            <Radio.Group onChange={props.onChange}  defaultValue={props.defaultValue} options={props.options}/>
        </div>
    }
}