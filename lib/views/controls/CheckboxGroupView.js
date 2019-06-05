import * as tslib_1 from "tslib";
import { Checkbox } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let CheckboxGroupView = class CheckboxGroupView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange, onBlur } = this.props;
        let component = field.componentProps;
        return React.createElement(Checkbox.Group, Object.assign({}, component, { onChange: onChange, options: component.options }));
    }
};
CheckboxGroupView = tslib_1.__decorate([
    observer
], CheckboxGroupView);
export { CheckboxGroupView };
