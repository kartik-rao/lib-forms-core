import * as tslib_1 from "tslib";
import { Col, Card } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { FieldView } from "./FieldView";
let ColumnView = class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, column } = this.props;
        const { fields } = column;
        return React.createElement("div", { className: "fl-col", "data-uuid": column.uuid, id: column.id },
            React.createElement(Col, { span: column.span ? column.span : this.props.span },
                React.createElement(Card, { bordered: false }, fields.map((field) => {
                    return React.createElement(FieldView, { field: field, store: store, key: field.uuid });
                }))));
    }
};
ColumnView = tslib_1.__decorate([
    observer
], ColumnView);
export { ColumnView };
