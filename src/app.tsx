import { Layout, Result, Skeleton } from "antd";
import React from 'react';
import { render } from 'react-dom';
import "./forms.core.m.css";
import { FormStoreProvider } from "./store/FormStoreProvider";
import config from "./config";
import { useLocalStore } from 'mobx-react';

export async function renderForm(selector:string, formId: string, initialState?: any) {
    console.log(`lib-forms-core [${config.env}] [${config.version}]`);
    const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => {return {default: module.FormView}}));
    if (initialState) {
        render(
            <Layout style={{height: '100vh', overflow: 'hidden'}}>
                <React.Suspense fallback="Loading">
                    <FormStoreProvider initialState={initialState}>
                        <FormView />
                    </FormStoreProvider>
                </React.Suspense>
            </Layout>, document.querySelector(selector)
        )
    } else {
        const localStore = useLocalStore(() => ({
            isLoading: true,
            response : null as any,
            get status () : "warning"|"error"|"success" {
                if (this.response && !this.response.error) {
                    return "success";
                }
                return this.response.error == "InactiveForm" ? "warning" : "error";
            },
            get message () : string {
                if (!this.response || !this.response.error) {
                    return "";
                }
                if (this.response.error == "InactiveForm") {
                    return this.response.hasEnded ? `${this.response.name} is no longer accepting entries` : `${this.response.name} hasn't starting accepting entries`
                }
                return "No content available at this location, please check the URL."
            },
            isRemoteError: false,
            isThrownError: false
        }));

        render( <Layout style={{height: '100vh', overflow: 'hidden'}}>
                    { localStore.isLoading ? <Skeleton active={true}/> : <>
                        {localStore.isRemoteError && <Result status={localStore.status} title={localStore.message}/>}
                        {localStore.isThrownError && <Result status="error" title="There was an error fetching this content, please try again later"/>}
                        {localStore.response && localStore.response.formData && <React.Suspense fallback="Loading">
                            <FormStoreProvider initialState={JSON.parse(localStore.response.formData)}>
                                <FormView />
                            </FormStoreProvider>
                        </React.Suspense>}
                    </> }
        </Layout>, document.querySelector(selector));

        try {
            let response: any = await fetch(`//${config.apiHost}/form/json/${formId}`);
            localStore.response = response;
            if (response.error) {
                if (response.error == "InactiveForm" && response.redirect) {
                    window.location = response.redirect;
                    return;
                }
                localStore.isRemoteError = true;
            }
        } catch (error) {
            localStore.isThrownError = true;
            console.error(error);
        } finally {
            localStore.isLoading = false;
        }
    }
};