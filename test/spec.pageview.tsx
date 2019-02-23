import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Column from '../src/models/column';
import Field from '../src/models/field';
import Section from '../src/models/section';
import FormStore from '../src/state/FormStore';
import { PageView } from "../src/views/PageView";
import Page from '../src/models/page';

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("PageView", () => {
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

    it("can render a section, column and child fields", (done) => {
        let p = new Page({ id: 'p1', sections: [], name: "Page 1"}, store);
        let s: Section = new Section({name: "s1", title: "s1 title"}, store)
        let c: Column = new Column({id: "c1"}, store);
        let f: Field = new Field({
            id: "f1",
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name"
        }, store);
        p.addSection(s);
        s.addColumn(c);

        act(() => {
            ReactDOM.render(<PageView page={p} store={store} />, container);
            return;
        });

        expect(container.querySelector("#p1")).toBeDefined();
        expect(container.querySelector("#s1")).toBeDefined();
        expect(container.querySelector("#c1")).toBeDefined();
        expect(container.querySelectorAll('input').length).toEqual(0);

        act(() => {
            c.addField(f);
            return;
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        expect(p.isValid).toBe(true);
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

        let p = new Page({ id: 'p1', sections: [], name: "Page 1"}, store);
        act(() => ReactDOM.render(<PageView page={p} store={store} />, container));
        let p1 = container.querySelector("#p1");
        expect(p1).toBeDefined();

        act(() => {p.addSection(s);return;});
        let sec1 = container.querySelector("#s1");
        expect(sec1).toBeDefined()
        expect(s.isValid).toBe(true);

        act(() => {s.addColumn(c);return;})
        let col1 = container.querySelector("#c1");
        expect(col1).toBeDefined()
        expect(c.isValid).toBe(true);

        act(()=> {c.addField(f);return;})
        expect(container.querySelectorAll('input').length).toBe(1);

        expect(p.errors.length).toBe(1);
        let input1 = container.querySelector("#f1");
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
            return;
        });
        expect(s.errors.length).toBe(0);
        done();
    });
});