import { Layout } from "antd";
import { enableLogging } from 'mobx-logger';
import React from 'react';
import { render } from 'react-dom';
import { FormStoreProvider } from "./store/FormStoreProvider";
import { EmptyForm } from './models/factory';
import TestForm from "./test-form";

import "./forms.core.m.css";

enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});

export default function renderForm(selector:string, initialState: any) {
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => {return {default: module.FormView}}));
    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <React.Suspense fallback="Loading">
                <FormStoreProvider initialState={initialState}>
                    <FormView />
                </FormStoreProvider>
            </React.Suspense>
    </Layout>, document.querySelector(selector)
    )
};

renderForm("#root", TestForm);