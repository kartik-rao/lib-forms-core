import { Layout } from "antd";
import { enableLogging } from 'mobx-logger';
import React from 'react';
import { render } from 'react-dom';
import { FormStoreProvider } from "./store/FormStoreProvider";
import TestForm from "./test-form";
import "./forms.core.m.css";
enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});
export default function renderForm(selector, initialState) {
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => { return { default: module.FormView }; }));
    render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
        React.createElement(React.Suspense, { fallback: "Loading" },
            React.createElement(FormStoreProvider, { initialState: initialState },
                React.createElement(FormView, null)))), document.querySelector(selector));
}
;
renderForm("#root", TestForm);
