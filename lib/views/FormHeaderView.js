import * as tslib_1 from "tslib";
import { Col, PageHeader, Row, Statistic } from "antd";
import * as React from "react";
import { observer } from 'mobx-react';
let FormHeaderView = class FormHeaderView extends React.Component {
    render() {
        let { title, subtitle, desc, currentPage, numPages, showSteps } = this.props;
        return React.createElement("div", { className: "fl-shadow-bottom", style: { marginBottom: '2px' } },
            React.createElement(PageHeader, { className: "fl-ph", style: { 'minHeight': '68px', border: 'none' }, title: title, subTitle: subtitle, extra: (showSteps && React.createElement("div", null,
                    React.createElement(Statistic, { title: "Page", value: currentPage + 1, suffix: "/ " + numPages }))) }),
            title && React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement("div", { className: "fl-ph-wrap" },
                        React.createElement("div", { className: "fl-ph-content fl-ph-padding" }, desc)))));
    }
};
FormHeaderView = tslib_1.__decorate([
    observer
], FormHeaderView);
export { FormHeaderView };
