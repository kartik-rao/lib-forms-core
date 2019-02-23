import React from 'react';
import { render } from 'react-dom';

import {Factory} from "./models/factory";
import FormStore from "./state/FormStore";
import {FormView} from "./views/FormView";

let store = new FormStore({});
let factory = new Factory(store);

export function renderForm(selector:string, initialState: any) {
    let form = factory.makeForm(initialState);
    store.setForm(form);
    console.log(form.content);
    render(<FormView store={store}/>, document.querySelector(selector))
};