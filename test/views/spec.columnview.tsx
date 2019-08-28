import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import { Column, ColumnView, Field, FormStoreType, createFormStore, FormStoreProvider } from '../../src/index';
import { genElementId } from "../utils";

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("ColumnView", () => {
    let store: FormStoreType;
    let container: HTMLElement;

    afterAll(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeAll(()=> {
        store = createFormStore(null);
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a column and child fields", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            fieldOptions: {
                valuePropName: "f1"
            },
            componentProps: {
                placeholder: "Enter f1",
            }
        }, store);

        let c: Column = new Column({id: genElementId("column")}, store);
        act(() => {
            ReactDOM.render(<FormStoreProvider initialState={null}>
                <ColumnView span={4} column={c} key={c.id} />
            </FormStoreProvider>, container);
        });

        expect(container.querySelector("#"+c.id)).toBeDefined();
        expect(container.querySelectorAll('input').length).toEqual(0);

        act(() => {
            c.addField(f);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        done();
    });

    it("is aware of field errors", (done) => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                placeholder: "Enter f1",
            },
            validation : {
                presence: {message: "f1 is required"}
            }
        }, store);

        let c: Column = new Column({id: genElementId("column")}, store);
        act(() => {
            ReactDOM.render(<div><FormStoreProvider initialState={null}><ColumnView span={4} column={c} key={c.id} /></FormStoreProvider></div>, container);
        });

        let col1 = container.querySelector("#"+c.id);
        expect(col1).toBeDefined()
        expect(c.isValid).toBe(true);

        act(()=> {
            c.addField(f);
        })

        expect(container.querySelectorAll('input').length).toBe(1);
        expect(c.errors.length).toBe(1);

        let input1 = container.querySelectorAll('input')[0];
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });
        expect(c.errors.length).toBe(0);
        done();
    });

});