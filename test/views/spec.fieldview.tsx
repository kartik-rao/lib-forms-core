import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import { Field, FieldView, FormStore } from '../../src/index';
import { genElementId } from "../utils";

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView", () => {
    let store: FormStore;
    let container: HTMLElement;

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeEach(()=> {
        store = new FormStore();
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a text input", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                placeholder: "Enter first Name"
            }
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
            fieldOptions : {
                valuePropName: "firstName"
            },
            componentProps: {
                placeholder: "Enter first Name"
            }
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });

        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelector('input');
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });

        expect(store.values[f.id]).toEqual('f1value');
        done();
    });

    it("validates input", (done)=> {
        const validationMessage = "[validates input] - field is required";
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            fieldOptions : {
                valuePropName: "firstName"
            },
            componentProps: {
                placeholder: "Enter first Name"
            },
            validation : {
                presence: { message: validationMessage}
            }
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f} store={store} /></div>, container);
        });

        expect(container.querySelectorAll('input').length).toEqual(1);

        let input1 = container.querySelectorAll('input')[0];
        expect(input1).toBeDefined();
        expect(f.isValid).toBe(false);
        expect(store.errors[f.id]).toContain(validationMessage);
        act(() => {
            f.setTouched()
        });
        let feedback = container.querySelectorAll(".show-help-enter")
        expect(feedback.length).toBeGreaterThan(0)
        expect(feedback[0].textContent).toContain(validationMessage);

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
            fieldOptions : {
                valuePropName: "firstName"
            },
            componentProps: {
                placeholder: "Enter first Name"
            }
        }, store);
        let f2: Field = new Field({
            id: genElementId("field"),
            name: "Last Name",
            type: "text",
            inputType: "input",
            condition : {predicates: [{condition: "eq", field: f1.id, value: "f1value"}]},
            fieldOptions : {
                valuePropName: "lastName"
            },
            componentProps: {
                placeholder: "Enter last name if first name is 'f1value'"
            }
        }, store);

        act(() => {
            ReactDOM.render(<div><FieldView field={f1} store={store} /><FieldView field={f2} store={store} /></div>, container);
        });

        // F2 is disabled as its condition value is false
        expect(container.querySelectorAll('input').length).toEqual(1);
        let input1 = container.querySelectorAll('input')[0];

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