import { Col, Layout, Row } from "antd";
import { enableLogging } from 'mobx-logger';
import Devtools from "mobx-react-devtools";
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import FormStore from "./state/FormStore";
import { FormView } from "./views/FormView";
enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});
export function renderForm(selector, initialState) {
    let debug = (window && window.location.hostname.indexOf('localhost') > -1) ? true : false;
    let store = new FormStore({ debug: debug });
    let factory = new Factory(store);
    let form = factory.makeForm(initialState);
    store.setForm(form);
    render(React.createElement(Layout, { style: { height: "100vh" } },
        debug && React.createElement(Devtools, null),
        React.createElement(Row, null,
            React.createElement("br", null)),
        React.createElement(Row, { justify: "space-around" },
            React.createElement(Col, { span: form.formLayoutOptions.wrapperSpan, offset: form.formLayoutOptions.wrapperOffset },
                React.createElement(FormView, { store: store })))), document.querySelector(selector));
}
;
