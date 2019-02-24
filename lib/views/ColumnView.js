var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Col } from "antd";
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
        return React.createElement("div", { id: column.id, className: "form-col" },
            React.createElement(Col, { span: this.props.span }, fields.map((field) => {
                return React.createElement(FieldView, { field: field, store: store, key: field.uuid });
            })));
    }
};
ColumnView = __decorate([
    observer
], ColumnView);
export { ColumnView };
