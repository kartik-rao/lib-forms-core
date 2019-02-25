var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        return React.createElement("div", { id: field.id, "data-uuid": field.uuid, className: "fl-field fl-checkbox-field" },
            React.createElement(Checkbox, Object.assign({}, component, { onChange: onChange })));
    }
};
CheckboxView = __decorate([
    observer
], CheckboxView);
export { CheckboxView };
