import { Col, Layout, Row } from "antd";
import { enableLogging } from 'mobx-logger';
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import FormStore from "./store/FormStore";
import { FormView } from "./views/FormView";
import "./app.css";
enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});
export function renderForm(selector, initialState) {
    let debug = (window && window.location.hostname.indexOf('localhost') > -1) ? true : false;
    let store = new FormStore();
    let factory = new Factory(store);
    let form = factory.makeForm(initialState);
    let { wrapperSpan, wrapperOffset } = form.formLayoutOptions;
    console.log("Initial Form is ", form);
    render(React.createElement(Layout, { style: { height: "100vh" } },
        React.createElement(Row, null,
            React.createElement("br", null)),
        React.createElement(Row, { justify: "space-around" },
            React.createElement(Col, { span: wrapperSpan, offset: wrapperOffset },
                React.createElement(FormView, { store: store })))), document.querySelector(selector));
}
;
