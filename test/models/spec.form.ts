import { when } from "mobx";
import {Column, IColumn, Field, Form, IFieldProps, Page, IPage, ISection, Section, FormStoreType, createFormStore} from "../../src/index"

import { genElementId } from "../utils";

const F1: IFieldProps= {
    id:  genElementId('field'),
    name: "f1",
    type: "string",
    inputType : "text",
    validation: {
        presence: {message: 'Required validation message'},
        length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
    },
    fieldOptions: {valuePropName: "f1"},
    componentProps: {
        placeholder: "Enter f1",
    }
};

const F2: IFieldProps = {id: "f2",
    name:  genElementId('field'),
    type: "string",
    inputType : "text",
    placeholder: "",
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validation: {
        presence: {message: 'Required validation message'}
    },
    fieldOptions: {valuePropName: "f2"},
    componentProps: {
        placeholder: "Enter f2",
    }
};

const C1: IColumn = {
    id: "1",
    name: "Column 1",
    title: "The First Column",
    fields: []
}

const S1: ISection = {
    id: 's1',
    columns: [],
    name: "Section 1"
}

const P1: IPage = {
    id: 'p1',
    sections: [],
    name: "Page 1"
}

describe('Form', () => {
    let store: FormStoreType;

    beforeEach(() => {
        store = createFormStore();
    });

    it("can be initialised", () => {
        let f = new Form({id: genElementId("form")}, store);
        expect(f.numPages).toEqual(0);
    });

    it("reacts to field property updates", async (done: any) => {
        let f = new Form({id: genElementId("form")}, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        let p = new Page(P1, store);
        p.addSection(s);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        f.addPage(p);
        try {
            when(() => f.isValid == true, done);
            // Populate both fields
            c.fields[0].setValue("qq");
            c.fields[1].setValue("abcd");
        } catch (error) {
            fail(error);
        }
    })

    it("reacts to addPage", () => {
        let f = new Form({id: genElementId("form")}, store);
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        expect(f.isValid).toEqual(true);
        expect(f.numPages).toBe(0);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        p.addSection(s);
        f.addPage(p);
        expect(f.numPages).toBe(1);
        expect(f.numFields).toBe(2);
        expect(f.isValid).toEqual(false);
        expect(Object.keys(store.errors).length).toBe(1);
    });

    it("reacts to removePage", () => {
        let f = new Form({id: genElementId("form")}, store);
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        s.addColumn(c);
        p.addSection(s);
        f.addPage(p)
        expect(f.numPages).toBe(1);
        expect(f.isValid).toEqual(false);
        f.removePage(0);
        expect(f.numPages).toBe(0);
        expect(f.isValid).toEqual(true);
    });

    it("recieves field errors", () => {
        let f = new Form({id: genElementId("form")}, store);
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        s.addColumn(c);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        p.addSection(s);
        f.addPage(p);
        expect(f.errors.length).toBe(1)
        // Fill fields to remove error
        c.fields[0].setValue('qq');
        c.fields[1].setValue('abcd');
        expect(f.errors.length).toBe(0);
    });
    it("computes form json", () => {
        let f = new Form({id: genElementId("form")}, store);
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        s.addColumn(c);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        p.addSection(s);
        f.addPage(p);
        let json = f.asPlainObject;
        expect(json).toBeDefined();
        expect(json.id).toEqual(f.id);
        expect(json.content).toBeDefined();
        expect(json.content.pages).toBeDefined();
        expect(json.content.pages.length).toEqual(1);
        expect(json.content.pages[0].sections).toBeDefined();
        expect(json.content.pages[0].sections.length).toEqual(1);
        expect(json.content.pages[0].sections[0]).toBeDefined();
        expect(json.content.pages[0].sections[0].columns).toBeDefined();
        expect(json.content.pages[0].sections[0].columns.length).toEqual(1)
        expect(json.content.pages[0].sections[0].columns[0].fields).toBeDefined();
        expect(json.content.pages[0].sections[0].columns[0].fields.length).toEqual(2);
        console.log("Form.asPlainObject", json);
    })
});
