import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import sinon from "sinon";
import { FieldTypes, IInputProps, Field, FormStore, InputView } from "../../../src/index";
import { genElementId } from "../../utils";


// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.InputView", () => {
    let store: FormStore;
    let container: HTMLElement;

    afterAll(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeAll(()=> {
        store = new FormStore();
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a input.text field", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: FieldTypes.input,
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                placeholder: "Enter f1",
            } as IInputProps
        }, store);

        let onChange = sinon.spy();

        act(() => {
            ReactDOM.render(<InputView field={f} onChange={onChange} />, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applied cssClass
        expect(container.querySelectorAll(".fl-input-text-field").length).toEqual(1);
        // Renders input
        expect(container.querySelectorAll('input').length).toEqual(1);

        // Triggers onChange
        let input1 = container.querySelectorAll('input')[0];
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value' } as HTMLInputElement});
        });
        expect(onChange.callCount).toBe(1);
        expect(onChange.getCalls()[0].args).toBeDefined();
        expect(onChange.getCalls()[0].args[0].target.value).toEqual('f1value');
        done();
    });

    it("can render a input.hidden field", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "hidden",
            inputType: "input",
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                placeholder: "Enter f1",
            }
        }, store);

        act(() => {
            ReactDOM.render(<InputView field={f} onChange={(e) => store.setFieldValue(f.id, e.target.value)} />, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applied cssClass
        expect(container.querySelectorAll(".fl-input-hidden-field").length).toEqual(1);
        // Renders input
        expect(container.querySelectorAll('input').length).toEqual(1);
        done();
    });

});