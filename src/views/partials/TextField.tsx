import { Input } from "antd";
import {observer} from "mobx-react";
import * as React from "react";
import {InputProps} from "antd/lib/input/Input"

interface ITextFieldProps extends InputProps {
    id   : string,
    uuid : string,
    type?: string,
    onBlur: any,
    onChange: any
    placeholder?: string,
    defaultValue?: string
}

@observer
export class TextField extends React.Component<ITextFieldProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {props} = this;

        return <div id={props.id} data-uuid={props.uuid} className="fl-field fl-text-field">
            <Input {...props}/>
        </div>
    }
}