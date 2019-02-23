import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Column from '../src/models/column';
import Field from '../src/models/field';
import Section from '../src/models/section';
import FormStore from '../src/state/FormStore';
import { SectionView } from "../src/views/SectionView";

// Allow mobx store mutation from anywhere
configure({enforceActions: "never"});

describe("SectionView", () => {
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

    it("can render a column and child fields", (done) => {
        let s: Section = new Section({name: "s1", title: "s1 title"}, store)
        let f: Field = new Field({
            id: "f1",
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);

        let c: Column = new Column({id: "c1"}, store);
        s.addColumn(c);
        act(() => {
            ReactDOM.render(<SectionView section={s} store={store} />, container);
        });

        expect(container.querySelector("#c1")).toBeDefined();
        expect(container.querySelectorAll('input').length).toEqual(0);

        act(() => {
            c.addField(f);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        expect(s.isValid).toBe(true);
        done();
    });

    it("is aware of field errors", (done) => {
        let s: Section = new Section({name: "s1", title: "s1 title"}, store)
        let c: Column = new Column({id: "c1"}, store);
        let f: Field = new Field({
            id: "f1",
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name",
            validationRules : {
                presence: {message: "f1 is required"}
            }
        }, store);


        act(() => ReactDOM.render(<div><SectionView section={s} store={store} /></div>, container));
        let sec1 = container.querySelector("#s1");
        expect(sec1).toBeDefined()
        expect(s.isValid).toBe(true);

        act(() => s.addColumn(c))
        let col1 = container.querySelector("#c1");
        expect(col1).toBeDefined()
        expect(c.isValid).toBe(true);

        act(()=> c.addField(f))
        expect(container.querySelectorAll('input').length).toBe(1);

        expect(s.errors.length).toBe(1);
        let input1 = container.querySelector("#f1");
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });
        expect(s.errors.length).toBe(0);
        done();
    });

});