import * as tslib_1 from "tslib";
import { Radio } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let RadioGroupView = class RadioGroupView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Radio.Group, { onChange: onChange, defaultValue: component.defaultValue, options: component.options });
    }
};
RadioGroupView = tslib_1.__decorate([
    observer
], RadioGroupView);
export { RadioGroupView };
