import * as tslib_1 from "tslib";
import { Radio } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let RadioView = class RadioView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let _a = field.componentProps, { optionLabel, optionValue, defaultChecked } = _a, rest = tslib_1.__rest(_a, ["optionLabel", "optionValue", "defaultChecked"]);
        return React.createElement(Radio, Object.assign({}, rest, { onChange: onChange, defaultChecked: defaultChecked, value: optionValue }), optionLabel);
    }
};
RadioView = tslib_1.__decorate([
    observer
], RadioView);
export { RadioView };
