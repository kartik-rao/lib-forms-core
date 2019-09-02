import { Card, Col } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Column } from "../models/column";
import { Field } from "../models/field";
import { formStoreContext } from '../store/FormStoreProvider';
import { FieldView } from "./FieldView";

export const ColumnView: React.FC<{column: Column, key: string, span: number}> = (props) => {
    const store = React.useContext(formStoreContext);
    if(!store) throw new Error("Store is  null");
    return useObserver(() => {
        return <div className="fl-col" data-uuid={props.column.uuid} id={`fl-col-${props.column.id}`}>
        <Col span={props.column.span ? props.column.span : props.span}>
            <Card bordered={false}>
                {props.column.fields.map((field: Field) => {
                    return <FieldView field={field} key={field.uuid}></FieldView>
                })}
            </Card>
        </Col>
    </div>
    });
}