import * as React from "react";
import { Card, Badge, Statistic, Row, Col, List, Divider, Tag, Popover } from "antd";
import { formStoreContext } from '../store/FormStoreProvider';
import { useObserver, useLocalStore } from 'mobx-react';
import { SubmitState } from '../models/form';
export const DebugView = (props) => {
    const fStore = React.useContext(formStoreContext);
    if (!fStore)
        throw new Error("Store is  null");
    const localStore = useLocalStore(() => ({
        get errorList() {
            let errorList = [];
            Object.keys(fStore.errors).map((f) => {
                fStore.errors[f] && errorList.push({ title: f, value: fStore.errors[f] });
            });
            return errorList;
        },
        get submitStateColor() {
            return fStore.form.submitState == SubmitState.NOT_SUBMITTED ? "default" :
                fStore.form.submitState == SubmitState.SUBMITTING ? "processing" :
                    fStore.form.submitState == SubmitState.SUCCESS ? "success" : "error";
        },
        get expectedSubmitResult() {
            return {
                error: fStore.form.successRedirect ? "Redirect" : fStore.form.submitErrorMessage ? "Set Message" : "Default Message",
                success: fStore.form.errorRedirect ? "Redirect" : fStore.form.submitSuccessMessage ? "Set Message" : "Default Message"
            };
        }
    }));
    return useObserver(() => {
        return React.createElement(Card, { title: fStore.form.content.title || "Untitled Form", bodyStyle: { padding: 10 }, extra: React.createElement("span", null,
                React.createElement(Badge, { status: localStore.submitStateColor, text: "Submiting", style: { marginRight: '15px' } }),
                React.createElement(Badge, { status: fStore.isSubmittable ? "success" : "error", text: "Can Submit", style: { marginRight: '15px' } }),
                React.createElement(Badge, { status: fStore.isValid ? "success" : "error", text: "Is Valid", style: { marginRight: '15px' } })) },
            React.createElement(Row, { key: "stats" },
                React.createElement(Col, { span: 6 },
                    React.createElement(Statistic, { title: "Pages", value: fStore.form.numPages })),
                React.createElement(Col, { span: 6 },
                    React.createElement(Statistic, { title: "Fields", value: fStore.form.numFields })),
                React.createElement(Col, { span: 6 },
                    React.createElement(Statistic, { title: "Errors", value: fStore.form.errors ? fStore.form.errors.length : 0 })),
                React.createElement(Col, { span: 6 },
                    React.createElement(Statistic, { title: "Touched", value: Object.keys(fStore.touched).length, suffix: `/ ${fStore.form.numFields}` }))),
            React.createElement(Divider, { key: "divider-submitinfo" }),
            React.createElement(Row, { key: "submit-info" },
                React.createElement("div", null,
                    React.createElement("h3", null, "Submit settings")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "Submit Target - "),
                    fStore.form.submitTarget ? React.createElement("span", { style: { marginLeft: "5px" } }, "Set") : React.createElement("span", { style: { marginLeft: "5px" } }, "Not Set")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "Status - "),
                    React.createElement("span", { style: { marginLeft: "5px" } }, fStore.form.submitState))),
            React.createElement(Divider, { key: "divider-outcomes" }),
            React.createElement(Row, null,
                React.createElement("div", null,
                    React.createElement("h3", null, "Submit Outcome")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Success - "),
                    " ",
                    React.createElement("span", { style: { marginLeft: "5px" } }, localStore.expectedSubmitResult.success)),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Error - "),
                    " ",
                    React.createElement("span", { style: { marginLeft: "5px" } }, localStore.expectedSubmitResult.error))),
            React.createElement(Divider, { key: "divider-messages" }),
            React.createElement(Row, { key: "messages" },
                React.createElement("div", null,
                    React.createElement("h3", null, "Messages")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Success - "),
                    fStore.form.submitSuccessMessage ? React.createElement(Popover, { content: fStore.form.submitSuccessMessage },
                        React.createElement("span", null, "Set")) : React.createElement("span", null, "Default")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Error - "),
                    fStore.form.submitErrorMessage ? React.createElement(Popover, { content: fStore.form.submitErrorMessage },
                        React.createElement("span", null, "Set")) : React.createElement("span", null, "Default"))),
            React.createElement(Divider, { key: "divider-redirects" }),
            React.createElement(Row, { key: "redirects" },
                React.createElement("div", null,
                    React.createElement("h3", null, "Redirects")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Success - "),
                    fStore.form.successRedirect ? React.createElement("a", { href: "fStore.form.successRedirect", target: "_blank" }, "Link") : React.createElement("span", { style: { marginLeft: "5px" } }, "Not Set")),
                React.createElement(Col, { span: 12 },
                    React.createElement("strong", null, "On Error - "),
                    fStore.form.errorRedirect ? React.createElement("a", { href: "fStore.form.errorRedirect", target: "_blank" }, "Link") : React.createElement("span", { style: { marginLeft: "5px" } }, "Not Set"))),
            React.createElement(Divider, { key: "divider-errors" }),
            React.createElement(Row, { key: "errors" },
                React.createElement(Col, { span: 24 },
                    React.createElement("div", null,
                        React.createElement("h3", null, "Errors"),
                        fStore.errors && React.createElement(List, null, localStore.errorList.map((error) => {
                            return React.createElement(List.Item, { key: error.title },
                                React.createElement("strong", null, error.title),
                                React.createElement(Tag, { color: "red", style: { marginLeft: "10px" } }, error.value));
                        }))))));
    });
};
