import * as tslib_1 from "tslib";
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
        return React.createElement(Transfer, Object.assign({}, component, { onChange: onChange, render: (item) => item.title }));
    }
};
TransferView = tslib_1.__decorate([
    observer
], TransferView);
export { TransferView };
