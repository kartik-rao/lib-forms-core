import { Col, Layout, Row } from "antd";
import { enableLogging } from 'mobx-logger';
import Devtools from "mobx-react-devtools";
import React from 'react';
import { render } from 'react-dom';
import { Factory } from "./models/factory";
import Form from './models/form';
import FormStore from "./store/FormStore";
import { FormView } from "./views/FormView";
import "./app.css";

import UIkit from '@kartikrao/uikit';
import Icons from '@kartikrao/uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false
});

export function renderForm(selector:string, initialState: any) {
    let debug = (window && window.location.hostname.indexOf('localhost') > -1) ? true : false;
    let store = new FormStore();
    let factory = new Factory(store);
    let form: Form = factory.makeForm(initialState);
    console.log(initialState);
    render(
        <div className="fl-container">
            <div className="fl-grid">
                {debug && <Devtools/>}
                <div className="fl-flex fl-flex-row">
                    <div><br/></div>
                    <div className="fl-flex fl-flex-column">
                        <div className="fl-width-1-1">
                            <FormView store={store}/>
                        </div>
                    </div>
                </div>
            </div>
        </div> ,document.querySelector(selector)
    )
};