import * as tslib_1 from "tslib";
import { observer } from "mobx-react";
import * as React from "react";
import { Input } from "antd";
let TextAreaView = class TextAreaView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Input.TextArea, Object.assign({}, component, { onChange: onChange }));
    }
};
TextAreaView = tslib_1.__decorate([
    observer
], TextAreaView);
export { TextAreaView };
