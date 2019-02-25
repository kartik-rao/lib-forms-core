import Column, { IColumn } from "../src/models/column";
import {IFieldProps} from "../src/models/field.properties";
import Field from "../src/models/field";
import Section, { ISection } from "../src/models/section";
import Page, {IPage} from "../src/models/page";
import Form from "../src/models/form";
import FormStore from "../src/state/FormStore";
import {when} from "mobx";
import {genElementId} from "./utils";

const F1: IFieldProps= {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    validationRules: {
        presence: {message: 'Required validation message'},
        length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
    },
    valuePropName: ["f1"],
    componentProps: {
        placeholder: "Enter f1",
    }
};

const F2: IFieldProps = {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    placeholder: "",
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validationRules: {
        presence: {message: 'Required validation message'}
    },
    valuePropName: ["f2"],
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
    let store: FormStore;

    beforeEach(() => {
        store = new FormStore({values: {}});
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
});
