import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { formStoreContext } from '../store/FormStoreProvider';
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";
export const FormView = () => {
    const fStore = React.useContext(formStoreContext);
    if (!fStore)
        throw new Error("Store is  null");
    return useObserver(() => {
        return fStore.form ? React.createElement(Layout, { style: { overflow: 'hidden' }, className: "fl-form-container fl-max-height" },
            React.createElement(FormHeaderView, { title: fStore.form.content.title, subtitle: fStore.form.content.subtitle, desc: fStore.form.description, currentPage: fStore.currentPage, numPages: fStore.numPages, showSteps: fStore.form.formLayoutOptions.showSteps }),
            React.createElement(Layout, { style: { overflow: 'hidden', border: '1px solid #ededed' } },
                React.createElement(Form, { onSubmit: (e) => fStore.form.handleSubmit(e), layout: fStore.form.layout, className: "fl-max-height", wrapperCol: fStore.form.formLayoutOptions.wrapperCol, labelCol: fStore.form.formLayoutOptions.labelCol, labelAlign: fStore.form.formLayoutOptions.labelAlign },
                    React.createElement(Layout.Content, { className: "fl-form" }, fStore.numPages > 0 && React.createElement(PageView, { page: fStore.form.content.pages[fStore.currentPage] })),
                    React.createElement(Layout.Footer, { style: { padding: '0px', width: '100%', marginTop: '1px' } },
                        React.createElement("div", { className: "fl-form-actions fl-shadow-top" },
                            React.createElement(Card, { bordered: false, bodyStyle: { padding: '18px' } },
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                        React.createElement(Button, { disabled: !fStore.isSubmittable, type: "primary", className: "fl-action-button", htmlType: "submit" }, "Submit"),
                                        React.createElement(Button, { disabled: !fStore.hasNextPage, type: "primary", className: "fl-action-button", onClick: () => fStore.nextPage() },
                                            React.createElement(Icon, { type: "right" }),
                                            "Next"),
                                        React.createElement(Button, { disabled: !fStore.hasPrevPage, type: "primary", className: "fl-action-button", onClick: () => fStore.prevPage() },
                                            React.createElement(Icon, { type: "left" }),
                                            "Prev"))))))))) : React.createElement(React.Fragment, null);
    });
};
