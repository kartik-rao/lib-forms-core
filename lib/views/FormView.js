import { Button, Card, Col, Drawer, Form, Icon, Layout, Result, Row } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { SubmitState } from '../models/form';
import { formStoreContext } from '../store/FormStoreProvider';
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";
const DebugView = React.lazy(() => import(/* webpackChunkName: "debug" */ "./DebugView").then((module) => { return { default: module.DebugView }; }));
export const FormView = () => {
    const fStore = React.useContext(formStoreContext);
    if (!fStore)
        throw new Error("Store is  null");
    let localStore = useLocalStore(() => ({
        get showForm() {
            return fStore.form.submitState == SubmitState.NOT_SUBMITTED || fStore.form.submitState == SubmitState.SUBMITTING;
        },
        get resultStatusTitle() {
            return {
                status: fStore.form.submitState == SubmitState.SUCCESS ? "success" : "error",
                title: fStore.form.submitState == SubmitState.SUCCESS ? fStore.form.submitSuccessMessage || "Entry submitted successfully" : fStore.form.submitErrorMessage || "There was an error submitting your entry"
            };
        }
    }));
    return useObserver(() => {
        return fStore.form ? React.createElement(React.Fragment, null,
            React.createElement(Layout, { style: { overflow: 'hidden', width: fStore.showDebug ? `calc(100% - 500px)` : '100%' }, className: "fl-form-container fl-max-height" },
                localStore.showForm && React.createElement(FormHeaderView, { title: fStore.form.content.title, subtitle: fStore.form.content.subtitle, desc: fStore.form.description, currentPage: fStore.currentPage, numPages: fStore.numPages, showSteps: fStore.form.formLayoutOptions.showSteps }),
                React.createElement(Layout, { style: { overflow: 'hidden', border: '1px solid #ededed', background: "#ffff" } },
                    fStore.debug && React.createElement(Drawer, { title: "Debug", width: 500, placement: "right", mask: false, closable: true, onClose: () => fStore.toggleShowDebug(), visible: fStore.showDebug },
                        React.createElement(DebugView, null)),
                    localStore.showForm ? React.createElement(Form, { onSubmit: (e) => fStore.form.handleSubmit(e), layout: fStore.form.layout, className: "fl-max-height", wrapperCol: fStore.form.formLayoutOptions.wrapperCol, labelCol: fStore.form.formLayoutOptions.labelCol, labelAlign: fStore.form.formLayoutOptions.labelAlign },
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
                                                "Prev"))))))) : React.createElement(Result, { status: localStore.resultStatusTitle.status, title: localStore.resultStatusTitle.title, style: { verticalAlign: "middle" }, subTitle: fStore.debug ? fStore.form.submitError : "" })))) : React.createElement(React.Fragment, null);
    });
};
