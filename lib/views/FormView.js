import * as tslib_1 from "tslib";
import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";
let FormView = class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const { store: formStore } = this.props;
        let { form, numPages } = formStore;
        let { content, formLayoutOptions } = form;
        let { currentPage, touched, isValid, isSubmitting } = formStore;
        return (React.createElement(Layout, { style: { height: '100%', overflow: 'hidden' }, className: "fl-form-container" },
            React.createElement(FormHeaderView, { title: content.title, subtitle: content.subtitle, desc: form.desc, currentPage: formStore.currentPage, numPages: formStore.numPages, showSteps: formLayoutOptions.showSteps }),
            React.createElement(Layout, { style: { overflow: 'hidden', border: '1px solid #ededed' } },
                React.createElement(Form, { onSubmit: (e) => form.handleSubmit(e), layout: form.layout, style: { height: '100%' }, wrapperCol: formLayoutOptions.wrapperCol, labelCol: formLayoutOptions.labelCol, labelAlign: formLayoutOptions.labelAlign },
                    React.createElement(Layout.Content, { style: { overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' } },
                        React.createElement(PageView, { page: content.pages[currentPage], store: formStore })),
                    React.createElement(Layout.Footer, { style: { padding: '0px', width: '100%', marginTop: '1px' } },
                        React.createElement("div", { className: "fl-form-actions fl-shadow-top" },
                            React.createElement(Card, { bordered: false },
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                        currentPage == numPages - 1 && React.createElement(Button, { disabled: Object.keys(touched).length == 0 || !isValid || isSubmitting, type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                        currentPage < numPages - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => formStore.nextPage() },
                                            React.createElement(Icon, { type: "right" }),
                                            "Next"),
                                        currentPage > 0 && numPages > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => formStore.prevPage() },
                                            React.createElement(Icon, { type: "left" }),
                                            "Prev"))))))))));
    }
};
FormView = tslib_1.__decorate([
    observer
], FormView);
export { FormView };
