var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Transfer } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let TransferView = class TransferView extends React.Component {
    constructor(props) {
        super(props);
        this.filterOption = (value, option) => {
            return option.description.indexOf(value) > -1;
        };
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement("div", { id: field.id, "data-uuid": field.uuid, className: "fl-field fl-transfer-field" },
            React.createElement(Transfer, Object.assign({}, component, { onChange: onChange, render: (item) => item.title })));
    }
};
TransferView = __decorate([
    observer
], TransferView);
export { TransferView };
