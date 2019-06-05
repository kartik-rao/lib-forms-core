import * as tslib_1 from "tslib";
import { Rate } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
let StarRatingView = class StarRatingView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { field, onChange } = this.props;
        let component = field.componentProps;
        return React.createElement(Rate, Object.assign({}, component, { onChange: onChange }));
    }
};
StarRatingView = tslib_1.__decorate([
    observer
], StarRatingView);
export { StarRatingView };
