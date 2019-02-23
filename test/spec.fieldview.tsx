import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Field from '../src/models/field';
import FormStore from '../src/state/FormStore';
import { FieldView } from "../src/views/FieldView";
import {genElementId} from "./utils";

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView", () => {
    let store: FormStore;
    let container: HTMLElement;

    // afterEach(() => {
    //     document.body.removeChild(container);
    //     container = null;
    // });

    beforeEach(()=> {
        store = new FormStore({values: {}});
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a text input", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector("#"+f.id);
        expect(input1).toBeDefined();
        done();
    });

    it("notifies store when value changes", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });

        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector("#"+f.id);
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });

        expect(store.values[f.id]).toEqual('f1value');
        done();
    });

    it("validates input", (done)=> {
        const validationMessage = "field is required";
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name",
            validationRules : {
                presence: { message: validationMessage}
            }
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });

        expect(container.querySelectorAll('input').length).toEqual(1);

        let input1 = container.querySelector("#"+f.id);
        expect(input1).toBeDefined();
        expect(f.isValid).toBe(false);
        expect(store.errors[f.id]).toEqual(validationMessage);

        let feedback = container.querySelectorAll(".show-help-appear")
        expect(feedback.length).toBeGreaterThan(0)
        expect(feedback[0].textContent).toEqual(validationMessage);

        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });

        expect(f.isValid).toBe(true);
        done();
    });

    it("evaluatues conditions", (done) => {
        let f1: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);
        let f2: Field = new Field({
            id: genElementId("field"),
            name: "Last Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter last name if first name is 'f1value'",
            condition : {predicates: [{condition: "eq", field: f1.id, value: "f1value"}]}
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f1} store={store} /><FieldView field={f2} store={store} /></div>, container);
        });

        // F2 is disabled as its condition value is false
        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector("#"+f1.id);

        // Store should be updated
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });
        expect(store.values[f1.id]).toBe("f1value");

        // Field should be marked as touched
        act(() => {
            ReactTestUtils.Simulate.blur(input1);
        });
        expect(store.touched[f1.id]).toBe(true);

        // F2 should have rendered
        expect(container.querySelectorAll('input').length).toEqual(2);
        expect(container.querySelector("#"+f2.id)).toBeDefined();
        done();
    });
});