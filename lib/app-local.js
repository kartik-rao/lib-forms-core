import { Layout } from "antd";
import TestForm from "./test-form";
import React from 'react';
import { render } from 'react-dom';
import "./forms.core.m.css";
import { FormStoreProvider } from "./store/FormStoreProvider";
import config from "./config";
export function renderForm(selector, initialState) {
    console.log(`lib-forms-core [WDS] [${config.env}] [${config.version}]`);
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => { return { default: module.FormView }; }));
    render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
        React.createElement(React.Suspense, { fallback: "Loading" },
            React.createElement(FormStoreProvider, { initialState: initialState },
                React.createElement(FormView, null)))), document.querySelector(selector));
}
;
renderForm("#root", TestForm);
