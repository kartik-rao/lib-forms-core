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
        let {field, onChange, onBlur} = this.props;
        let component = field.componentProps as INumberProps;

        let handleChange = (e) => {!!e ? onChange(parseInt(e)) : void(0)};

        return <div id={field.id} data-uuid={field.uuid} className="fl-field fl-number-field">
            <InputNumber {...component} onChange={handleChange} onBlur={onBlur}/>
        </div>
    }
}