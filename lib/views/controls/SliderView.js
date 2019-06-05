import * as tslib_1 from "tslib";
import { Slider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let SliderView = class SliderView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Slider, Object.assign({}, component, { onChange: onChange }));
    }
};
SliderView = tslib_1.__decorate([
    observer
], SliderView);
export { SliderView };
