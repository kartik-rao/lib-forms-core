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

export default function renderForm(selector:string, initialState: any) {
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => {return {default: module.FormView}}));
    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <Layout.Header></Layout.Header>
            <React.Suspense fallback="Loading">
                <FormStoreProvider initialState={initialState}>
                    <FormView />
                </FormStoreProvider>
            </React.Suspense>
    </Layout>, document.querySelector(selector)
    )
};

renderForm("#root", {
    id: "foo",
    name: "A sample form",
    desc: "A simple form to demonstrate Forms.li",
    layout: 'vertical'
});