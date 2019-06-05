import * as tslib_1 from "tslib";
import { Cascader } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let CascaderView = class CascaderView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Cascader, Object.assign({}, component, { onChange: onChange }));
    }
};
CascaderView = tslib_1.__decorate([
    observer
], CascaderView);
export { CascaderView };
