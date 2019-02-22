import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Field from '../src/models/field';
import FormStore from '../src/state/FormStore';
import { FieldView } from "../src/views/FieldView";

configure({enforceActions: "never"});

describe("FieldView", () => {
    let store: FormStore;
    let container: HTMLElement;

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeEach(()=> {
        store = new FormStore({values: {"f1": "", "f2": ""}});
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("renders a text input", (done) => {
        let f: Field = new Field({
            id: "f1",
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector("#f1");
        expect(input1).toBeDefined();
        done();
    });

    it("[isValid=false] if validation errors exist", (done)=> {
        const validationMessage = "field is required";
        let f: Field = new Field({
            id: "f1",
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

        let input1 = container.querySelector("#f1");
        expect(input1).toBeDefined();
        expect(f.isValid).toBe(false);
        expect(store.errors["f1"]).toEqual(validationMessage);

        let feedback = container.querySelectorAll(".show-help-appear")
        expect(feedback.length).toBeGreaterThan(0)
        expect(feedback[0].textContent).toEqual(validationMessage);

        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'kartik'} as HTMLInputElement});
        });

        expect(f.isValid).toBe(true);
        done();
    });

    it("[isDisabled=true] if conditionally disabled", (done) => {
        let f1: Field = new Field({
            id: "f1",
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);
        let f2: Field = new Field({
            id: "f2",
            name: "Last Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter last name if first name is 'kartik'",
            condition : {predicates: [{condition: "eq", field: "f1", value: "kartik"}]}
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f1} store={store} /><FieldView field={f2} store={store} /></div>, container);
        });

        // F2 is disabled as its condition value is false
        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector("#f1");

        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'kartik'} as HTMLInputElement});
        });

        // Store should be updated
        expect(store.values["f1"]).toBe("kartik");
        // F2 should have rendered
        expect(container.querySelectorAll('input').length).toEqual(2);
        expect(container.querySelector("#f2")).toBeDefined();
        done();
    });
});