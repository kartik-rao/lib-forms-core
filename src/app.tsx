import { Layout, Result, Skeleton } from "antd";
import { toJS } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import config from "./config";
import "./forms.core.m.css";
import { FormStoreProvider } from "./store/FormStoreProvider";

export interface IFormRenderProps {
    formId: string;
    initialState? : any;
}

const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => {return {default: module.FormView}}));

const FormWrapper : React.FC<IFormRenderProps> = (props: IFormRenderProps) => {

    const localStore = useLocalStore(() => ({
        isLoading: true as boolean,
        response : null as any,
        get status () : "warning"|"error"|"success" {
            if (this.isLoading || !this.response || (this.response && !this.response.error)) {
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
        isRemoteError: false as boolean,
        isThrownError: false as boolean
    }));

    React.useEffect(() => {
        let fetchData = async function() {
            try {
                let _response: any = await fetch(`//${config.apiHost}/form/json/${props.formId}`);
                let response = await _response.json();
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
            }
            localStore.isLoading = false;
        }

        if(props.formId) {
            fetchData();
        }
    }, []);

    return useObserver(() => {
        return <Layout style={{height: '100vh', overflow: 'hidden', backgroundColor: "#ffff"}}>
        { localStore.isLoading ? <Skeleton active={true}/> : <>
            {localStore.isRemoteError && <Result status={localStore.status} title={localStore.message}/>}
            {localStore.isThrownError && <Result status="error" title="There was an error fetching this content, please try again later"/>}
            {localStore.response && <React.Suspense fallback="Loading">
                <FormStoreProvider initialState={toJS(localStore.response)}>
                    <FormView />
                </FormStoreProvider>
            </React.Suspense>}
        </> }
    </Layout>});
}

export async function renderForm(selector:string, formId: string, initialState?: any) {
    console.log(`lib-forms-core [${config.env}] [${config.version}]`);
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
        render (<FormWrapper formId={formId}/>, document.querySelector(selector))
    }
};