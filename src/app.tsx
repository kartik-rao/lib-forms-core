import { Col, Layout, Row } from "antd";
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import Form from './models/form';
import FormStore from "./state/FormStore";
import { FormView } from "./views/FormView";
import {enableLogging} from 'mobx-logger';

// optional
const config = {
    action: true,
    reaction: false,
    transaction: false,
    compute: false
};

enableLogging(config);


export function renderForm(selector:string, initialState: any) {
    let store = new FormStore({});
    let factory = new Factory(store);
    let form: Form = factory.makeForm(initialState);
    store.setForm(form);

    render(
        <Layout style={{height:"100vh"}}>
            <Row><br/></Row>
            <Row justify="space-around">
                <Col span={form.formLayoutOptions.wrapperSpan} offset={form.formLayoutOptions.wrapperOffset}>
                    <FormView store={store}/>
                </Col>
            </Row>
        </Layout> ,document.querySelector(selector)
    )
};