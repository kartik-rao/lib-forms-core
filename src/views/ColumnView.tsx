import { Card, Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Column } from "../models/column";
import { Field } from "../models/field";
import { FormStore } from "../store/FormStore";
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
        return <div className="fl-col" data-uuid={column.uuid} id={`fl-col-${column.id}`}>
            <Col span={column.span ? column.span : this.props.span}>
                <Card bordered={false}>
                    {fields.map((field: Field) => {
                        return <FieldView field={field} store={store} key={field.uuid}></FieldView>
                    })}
                </Card>
            </Col>
        </div>;
    }
}