import { Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Column from "../models/column";
import Field from "../models/field";
import FormStore from "../state/FormStore";
import { FieldView } from "./FieldView";

export interface ColumnProps {
    column: Column;
    store: FormStore;
    span: number
}

@observer
export class ColumnView extends React.Component<ColumnProps, any> {
    props: ColumnProps;

    constructor(props: ColumnProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, column} = this.props;
        const { fields } = column;

        // TODO : Write reusable DnD wrapper
        return  <div className="form-col">
            <Col span={this.props.span}>
                {fields.map((field: Field, fn:number) => {
                    return <FieldView field={field} store={store} key={field.uuid}></FieldView>
                })}
            </Col>
        </div>;
    }
}