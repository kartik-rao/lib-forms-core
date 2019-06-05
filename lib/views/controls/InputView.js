import * as tslib_1 from "tslib";
import { Input } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let InputView = class InputView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange, onBlur } = this.props;
        let component = field.componentProps;
        return React.createElement(Input, Object.assign({}, component, { defaultValue: component.defaultValue, onChange: onChange, onBlur: onBlur, hidden: field.isHidden }));
    }
};
InputView = tslib_1.__decorate([
    observer
], InputView);
export { InputView };
