import * as tslib_1 from "tslib";
import { InputNumber } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let NumberView = class NumberView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange, onBlur } = this.props;
        let component = field.componentProps;
        let handleChange = (e) => { !!e ? onChange(parseInt(e)) : void (0); };
        return React.createElement(InputNumber, Object.assign({}, component, { onChange: handleChange, onBlur: onBlur }));
    }
};
NumberView = tslib_1.__decorate([
    observer
], NumberView);
export { NumberView };
