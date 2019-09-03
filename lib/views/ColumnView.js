import { Card, Col } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
import { FieldView } from "./FieldView";
export const ColumnView = (props) => {
    const fStore = React.useContext(formStoreContext);
    if (!fStore)
        throw new Error("Store is  null");
    return useObserver(() => {
        return React.createElement("div", { className: "fl-col", "data-uuid": props.column.uuid, id: `fl-col-${props.column.id}` },
            React.createElement(Col, { span: props.column.span ? props.column.span : props.span },
                React.createElement(Card, { bordered: false }, props.column.fields.map((field) => {
                    return React.createElement(FieldView, { field: field, key: field.uuid });
                }))));
    });
};
