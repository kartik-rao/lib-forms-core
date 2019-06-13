import * as tslib_1 from "tslib";
import { Checkbox } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let CheckboxView = class CheckboxView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Checkbox, Object.assign({}, component, { onChange: onChange }));
    }
};
CheckboxView = tslib_1.__decorate([
    observer
], CheckboxView);
export { CheckboxView };
