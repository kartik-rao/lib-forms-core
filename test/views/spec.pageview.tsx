import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Column from '../../src/models/column';
import Field from '../../src/models/field';
import Section from '../../src/models/section';
import FormStore from '../../src/state/FormStore';
import { PageView } from "../../src/views/PageView";
import Page from '../../src/models/page';
import {genElementId} from "../utils";

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
        store = new FormStore({values: {}});
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a section, column and child fields", (done) => {
        let p = new Page({ id: genElementId("page"), sections: [], name: "Page 1"}, store);
        let s: Section = new Section({id: genElementId("section"), name: "s1", title: "s1 title"}, store)
        let c: Column = new Column({id: genElementId("column")}, store);
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            valuePropName: ["f1"],
            componentProps: {
                placeholder: "Enter first name",
            }
        }, store);
        p.addSection(s);
        s.addColumn(c);

        act(() => {
            ReactDOM.render(<PageView page={p} store={store} />, container);
        });

        expect(container.querySelector("#"+p.id)).toBeDefined();
        expect(container.querySelector("#"+s.id)).toBeDefined();
        expect(container.querySelector("#"+c.id)).toBeDefined();
        expect(container.querySelectorAll('input').length).toEqual(0);

        act(() => {
            c.addField(f);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        expect(p.isValid).toBe(true);
        done();
    });

    it("is aware of field errors", (done) => {
        let s: Section = new Section({id:genElementId("page"), name: "s1", title: "s1 title"}, store)
        let c: Column = new Column({id: genElementId("column")}, store);
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            placeholder: "Enter first name",
            validationRules : {
                presence: {message: "First Name is required"}
            },
            valuePropName: ["f1"],
            componentProps: {
                placeholder: "Enter first name",
            }
        }, store);

        let p = new Page({ id: genElementId("page"), sections: [], name: "Page 1"}, store);
        act(() => ReactDOM.render(<PageView page={p} store={store} />, container));
        let p1 = container.querySelector("#"+p.id);
        expect(p1).toBeDefined();

        act(() => {p.addSection(s);});
        let sec1 = container.querySelector("#"+s.id);
        expect(sec1).toBeDefined()
        expect(s.isValid).toBe(true);

        act(() => {s.addColumn(c);})
        let col1 = container.querySelector("#"+c.id);
        expect(col1).toBeDefined()
        expect(c.isValid).toBe(true);

        act(()=> {c.addField(f)})
        expect(container.querySelectorAll('input').length).toBe(1);

        expect(p.errors.length).toBe(1);
        let input1 = container.querySelectorAll('input')[0];
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });
        expect(s.errors.length).toBe(0);
        done();
    });
});