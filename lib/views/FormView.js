var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Col, Form, Row, Steps } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { PageView } from "./PageView";
let FormView = class FormView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { store } = this.props;
        let { form } = store;
        let { content, formLayoutOptions } = form;
        return (React.createElement("div", { className: "form-wrapper" },
            content.title && React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement(Card, null,
                        React.createElement("h2", null, content.title),
                        React.createElement("br", null),
                        React.createElement("h3", null, content.subtitle)))),
            formLayoutOptions.showSteps && React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement(Card, null,
                        React.createElement(Steps, { size: "small", current: store.currentPage }, content.pages.map((page, pn) => {
                            return React.createElement(Steps.Step, { title: page.title, key: pn });
                        }))))),
            React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement(Form, { onSubmit: form.handleSubmit },
                        React.createElement("div", { className: "page-wrapper" },
                            React.createElement(PageView, { page: content.pages[store.currentPage], store: store })),
                        React.createElement("div", { className: "page-actions" },
                            React.createElement(Card, null,
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                        store.currentPage == content.pages.length - 1 && React.createElement(Button, { disabled: Object.keys(store.touched).length == 0 || !form.isValid || store.isSubmitting, type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                        store.currentPage < content.pages.length - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => store.nextPage() }, "Next"),
                                        store.currentPage > 0 && content.pages.length > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => store.prevPage() }, "Prev"))))),
                        React.createElement("div", null,
                            "Errors",
                            React.createElement("br", null),
                            JSON.stringify(store.errors)),
                        React.createElement("div", null,
                            "Touched",
                            React.createElement("br", null),
                            JSON.stringify(store.touched)),
                        React.createElement("div", null,
                            "Values",
                            React.createElement("br", null),
                            JSON.stringify(store.values)))))));
    }
};
FormView = __decorate([
    observer
], FormView);
export { FormView };
