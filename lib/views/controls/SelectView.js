import * as tslib_1 from "tslib";
import { Select } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let SelectView = class SelectView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onBlur, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Select, Object.assign({}, component, { onChange: onChange, onBlur: onBlur }), component.options && component.options.map((option, index) => {
            return React.createElement(Select.Option, { key: field.id + "-option-" + index, value: option.value }, option.label);
        }));
    }
};
SelectView = tslib_1.__decorate([
    observer
], SelectView);
export { SelectView };
