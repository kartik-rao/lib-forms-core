import { __awaiter } from "tslib";
import { Layout, Result, Skeleton } from "antd";
import { toJS } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
import config from "./config";
import "./forms.core.m.css";
import { FormStoreProvider } from "./store/FormStoreProvider";
const FormView = React.lazy(() => import(/* webpackChunkName: "core" */ "./views/FormView").then((module) => { return { default: module.FormView }; }));
const FormWrapper = (props) => {
    const localStore = useLocalStore(() => ({
        isLoading: true,
        response: null,
        get status() {
            if (this.isLoading || !this.response || (this.response && !this.response.error)) {
                return "success";
            }
            return this.response.error == "InactiveForm" ? "warning" : "error";
        },
        get message() {
            if (!this.response || !this.response.error) {
                return "";
            }
            if (this.response.error == "InactiveForm") {
                return this.response.hasEnded ? `${this.response.name} is no longer accepting entries` : `${this.response.name} hasn't starting accepting entries`;
            }
            return "No content available at this location, please check the URL.";
        },
        isRemoteError: false,
        isThrownError: false
    }));
    React.useEffect(() => {
        let fetchData = function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let _response = yield fetch(`//${config.apiHost}/form/json/${props.formId}`);
                    let response = yield _response.json();
                    localStore.response = response;
                    if (response.error) {
                        if (response.error == "InactiveForm" && response.redirect) {
                            window.location = response.redirect;
                            return;
                        }
                        localStore.isRemoteError = true;
                    }
                }
                catch (error) {
                    localStore.isThrownError = true;
                    console.error(error);
                }
                localStore.isLoading = false;
            });
        };
        if (props.formId) {
            fetchData();
        }
    }, []);
    return useObserver(() => {
        return React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden', backgroundColor: "#ffff" } }, localStore.isLoading ? React.createElement(Skeleton, { active: true }) : React.createElement(React.Fragment, null,
            localStore.isRemoteError && React.createElement(Result, { status: localStore.status, title: localStore.message }),
            localStore.isThrownError && React.createElement(Result, { status: "error", title: "There was an error fetching this content, please try again later" }),
            localStore.response && React.createElement(React.Suspense, { fallback: "Loading" },
                React.createElement(FormStoreProvider, { initialState: toJS(localStore.response) },
                    React.createElement(FormView, null)))));
    });
};
export function renderForm(selector, formId, initialState) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`lib-forms-core [${config.env}] [${config.version}]`);
        if (initialState) {
            render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
                React.createElement(React.Suspense, { fallback: "Loading" },
                    React.createElement(FormStoreProvider, { initialState: initialState },
                        React.createElement(FormView, null)))), document.querySelector(selector));
        }
        else {
            render(React.createElement(FormWrapper, { formId: formId }), document.querySelector(selector));
        }
    });
}
;
