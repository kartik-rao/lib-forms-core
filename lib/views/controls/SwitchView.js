import * as tslib_1 from "tslib";
import { Switch } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let SwitchView = class SwitchView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Switch, Object.assign({}, component, { onChange: onChange }));
    }
};
SwitchView = tslib_1.__decorate([
    observer
], SwitchView);
export { SwitchView };
