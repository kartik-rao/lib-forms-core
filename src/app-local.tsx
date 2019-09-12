import { Layout } from "antd";
import TestForm from "./test-form";
import React from 'react';
import { render } from 'react-dom';
import "./forms.core.m.css";
import { FormStoreProvider } from "./store/FormStoreProvider";
import config from "./config";

export function renderForm(selector:string, initialState: any) {
    console.log(`lib-forms-core [WDS] [${config.env}] [${config.version}]`);
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