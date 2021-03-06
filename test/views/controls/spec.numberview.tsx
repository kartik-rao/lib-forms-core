import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import sinon from "sinon";
import { Field, FormStore, NumberView } from "../../../src/index";
import { genElementId } from "../../utils";

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.NumberView", () => {
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

    it("can render a number field", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            inputType: "number",
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                defaultValue:1
            }
        }, store);

        let onChange = sinon.spy();
        act(() => {
            ReactDOM.render(<NumberView field={f} onChange={onChange} />, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applied cssClass
        expect(container.querySelectorAll(".fl-number-field").length).toEqual(1);
        // Renders input
        expect(container.querySelectorAll('input').length).toEqual(1);

        // Triggers onChange
        let input1 = container.querySelectorAll('input')[0];
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: '15' } as HTMLInputElement});
        });
        expect(onChange.callCount).toBe(1);
        expect(onChange.getCalls()[0].args).toBeDefined();
        expect(onChange.getCalls()[0].args[0]).toEqual(15);
        done();
    });
});