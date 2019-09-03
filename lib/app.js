import { Layout } from "antd";
import { enableLogging } from 'mobx-logger';
import React from 'react';
import { render } from 'react-dom';
import { FormStoreProvider } from "./store/FormStoreProvider";
enableLogging({
    action: false,
    reaction: false,
    transaction: false,
    compute: false
});
export default function renderForm(selector, initialState) {
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => { return { default: module.FormView }; }));
    render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
        React.createElement(Layout.Header, null),
        React.createElement(React.Suspense, { fallback: "Loading" },
            React.createElement(FormStoreProvider, { initialState: initialState },
                React.createElement(FormView, null)))), document.querySelector(selector));
}
;
renderForm("#root", {
    id: "foo",
    name: "A sample form",
    desc: "A simple form to demonstrate Forms.li",
    layout: 'vertical'
});
