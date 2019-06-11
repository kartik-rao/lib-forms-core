import * as tslib_1 from "tslib";
import { Button, Card, Col, Form, Icon, Row, PageHeader, Statistic, Layout } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { PageView } from "./PageView";
let FormView = class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const { store: formStore } = this.props;
        let { form } = formStore;
        let { content, formLayoutOptions } = form;
        let { wrapperSpan, wrapperOffset } = formLayoutOptions;
        let { currentPage } = formStore;
        return (React.createElement(Layout, { style: { height: '100%', overflow: 'hidden' }, className: "fl-form-container" },
            React.createElement("div", { className: "fl-shadow-bottom", style: { marginBottom: '2px' } },
                React.createElement(PageHeader, { className: "fl-ph", style: { 'minHeight': '68px', border: 'none' }, title: content.title, subTitle: content.subtitle, extra: (form.formLayoutOptions.showSteps && React.createElement("div", null,
                        React.createElement(Statistic, { title: "Page", value: formStore.currentPage + 1, suffix: "/ " + content.pages.length }))) }),
                content.title && React.createElement(Row, null,
                    React.createElement(Col, { span: wrapperSpan },
                        React.createElement("div", { className: "fl-ph-wrap" },
                            React.createElement("div", { className: "fl-ph-content fl-ph-padding" }, form.desc))))),
            React.createElement(Layout, { style: { overflow: 'hidden', border: '1px solid #ededed' } },
                React.createElement(Form, { onSubmit: (e) => form.handleSubmit(e), layout: form.layout, style: { height: '100%' } },
                    React.createElement(Layout.Content, { style: { overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' } },
                        React.createElement(PageView, { page: content.pages[formStore.currentPage], store: formStore })),
                    React.createElement("div", null,
                        React.createElement(Layout.Footer, { style: { padding: '0px', width: '100%', marginTop: '1px' } },
                            React.createElement("div", { className: "fl-form-actions fl-shadow-top" },
                                React.createElement(Card, { bordered: false },
                                    React.createElement(Row, null,
                                        React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                            currentPage == content.pages.length - 1 && React.createElement(Button, { disabled: Object.keys(formStore.touched).length == 0 || !form.isValid || formStore.isSubmitting, type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                            currentPage < content.pages.length - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => formStore.nextPage() },
                                                React.createElement(Icon, { type: "right" }),
                                                "Next"),
                                            currentPage > 0 && content.pages.length > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => formStore.prevPage() },
                                                React.createElement(Icon, { type: "left" }),
                                                "Prev")))))))))));
    }
};
FormView = tslib_1.__decorate([
    observer
], FormView);
export { FormView };
