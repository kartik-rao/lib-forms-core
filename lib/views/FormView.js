import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";
export const FormView = () => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("Store is  null");
    return useObserver(() => {
        return store.form ? React.createElement(Layout, { style: { height: '100%', overflow: 'hidden' }, className: "fl-form-container" },
            React.createElement(FormHeaderView, { title: store.form.content.title, subtitle: store.form.content.subtitle, desc: store.form.description, currentPage: store.currentPage, numPages: store.numPages, showSteps: store.form.formLayoutOptions.showSteps }),
            React.createElement(Layout, { style: { overflow: 'hidden', border: '1px solid #ededed' } },
                React.createElement(Form, { onSubmit: (e) => store.form.handleSubmit(e), layout: store.form.layout, style: { height: '100%' }, wrapperCol: store.form.formLayoutOptions.wrapperCol, labelCol: store.form.formLayoutOptions.labelCol, labelAlign: store.form.formLayoutOptions.labelAlign },
                    React.createElement(Layout.Content, { style: { overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' } }, store.numPages > 0 && React.createElement(PageView, { page: store.form.content.pages[store.currentPage] })),
                    React.createElement(Layout.Footer, { style: { padding: '0px', width: '100%', marginTop: '1px' } },
                        React.createElement("div", { className: "fl-form-actions fl-shadow-top" },
                            React.createElement(Card, { bordered: false },
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                        store.currentPage == store.numPages - 1 && React.createElement(Button, { disabled: Object.keys(store.touched).length == 0 || !store.isValid || store.isSubmitting, type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                        store.currentPage < store.numPages - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => store.nextPage() },
                                            React.createElement(Icon, { type: "right" }),
                                            "Next"),
                                        store.currentPage > 0 && store.numPages > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => store.prevPage() },
                                            React.createElement(Icon, { type: "left" }),
                                            "Prev"))))))))) : React.createElement(React.Fragment, null);
    });
};
