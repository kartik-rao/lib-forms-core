import { Col, Layout, Row } from "antd";
import { enableLogging } from 'mobx-logger';
import Devtools from "mobx-react-devtools";
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import Form from './models/form';
import FormStore from "./state/FormStore";
import { FormView } from "./views/FormView";

enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});

export function renderForm(selector:string, initialState: any) {
    let debug = (window && window.location.hostname.indexOf('localhost') > -1) ? true : false;
    let store = new FormStore({debug: debug});
    let factory = new Factory(store);
    let form: Form = factory.makeForm(initialState);

    store.setForm(form);

    render(
        <Layout style={{height:"100vh"}}>
            {debug && <Devtools/>}
            <Row><br/></Row>
            <Row justify="space-around">
                <Col span={form.formLayoutOptions.wrapperSpan} offset={form.formLayoutOptions.wrapperOffset}>
                    <FormView store={store}/>
                </Col>
            </Row>
        </Layout> ,document.querySelector(selector)
    )
};