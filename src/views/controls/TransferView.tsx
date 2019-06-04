import { Transfer } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IViewProps } from "./IViewProps";
import { ITransferProps } from "../../models/field.properties";

@observer
export class TransferView extends React.Component<IViewProps, any> {

    constructor(props: any) {
        super(props);
    }


    filterOption = (value, option) => {
        return option.description.indexOf(value) > -1
    }

    render() {
        let {field, onChange} = this.props;
        let component = field.componentProps as ITransferProps;

        return <Transfer {...component} onChange={onChange} render={(item) => item.title}/>
    }
}