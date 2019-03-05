import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import Column from '../../src/models/column';
import Field from '../../src/models/field';
import Section from '../../src/models/section';
import FormStore from '../../src/store/FormStore';
import { SectionView } from "../../src/views/SectionView";
import {genElementId} from "../utils";

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("SectionView", () => {
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

    it("can render a column and child fields", (done) => {
        let s: Section = new Section({id: genElementId("section"), name: "s1", title: "s1 title", columns:[]}, store)
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            valuePropName: "f1",
            componentProps: {
                placeholder: "Enter first name",
            }
        }, store);

        let c: Column = new Column({id: genElementId("column")}, store);
        s.addColumn(c);

        act(() => {
            ReactDOM.render(<SectionView section={s} store={store} />, container);
        });

        expect(container.querySelector("#"+c.id)).toBeDefined();
        expect(container.querySelectorAll('input').length).toEqual(0);

        act(() => {
            c.addField(f);
        });
        expect(container.querySelectorAll('input').length).toEqual(1);
        expect(s.isValid).toBe(true);
        done();
    });

    it("is aware of field errors", (done) => {
        let s: Section = new Section({id: genElementId("section"), name: "s1", title: "s1 title", columns:[]}, store)
        let c: Column = new Column({id: genElementId("column")}, store);
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            type: "text",
            inputType: "input",
            valuePropName: "f1",
            componentProps: {
                placeholder: "Enter first name",
            },
            validation : {
                presence: {message: "First Name is required"}
            }
        }, store);

        act(() => ReactDOM.render(<SectionView section={s} store={store} />, container));
        let sec1 = container.querySelector("#"+s.id);
        expect(sec1).toBeDefined()
        expect(s.isValid).toBe(true);

        act(() => s.addColumn(c))
        let col1 = container.querySelector("#"+c.id);
        expect(col1).toBeDefined()
        expect(c.isValid).toBe(true);

        act(()=> c.addField(f))
        expect(container.querySelectorAll('input').length).toBe(1);

        expect(s.errors.length).toBe(1);
        let input1 = container.querySelectorAll('input')[0];
        act(() => {
            ReactTestUtils.Simulate.change(input1, {target: {value: 'f1value'} as HTMLInputElement});
        });
        expect(s.errors.length).toBe(0);
        done();
    });

});