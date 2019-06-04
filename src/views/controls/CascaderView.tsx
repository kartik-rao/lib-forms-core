import { Cascader } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ICascaderProps } from "../../models/field.properties";

@observer
export class CascaderView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ICascaderProps;
        return <Cascader {...component} onChange={onChange}/>;
    }
}