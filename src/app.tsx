import { Col, Layout, Row } from "antd";
import { enableLogging } from 'mobx-logger';
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import Form from './models/form';
import FormStore from "./store/FormStore";
import { FormView } from "./views/FormView";
import "./app.css";

const debug = (window && window.location.hostname.indexOf('localhost') > -1) ? true : false;

enableLogging({
    action: debug,
    reaction: false,
    transaction: false,
    compute: false
});

export function renderForm(selector:string, initialState: any) {
    let store = new FormStore();
    let factory = new Factory(store);
    let form: Form = factory.makeForm(initialState);
    let {wrapperSpan, wrapperOffset} = form.formLayoutOptions;

    render(
        <Layout style={{height:"100vh"}} >
            <Row><br/></Row>
            <Row justify="space-around">
                <Col span={wrapperSpan} offset={wrapperOffset}>
                    <FormView store={store}/>
                </Col>
            </Row>
        </Layout>, document.querySelector(selector)
    )
};