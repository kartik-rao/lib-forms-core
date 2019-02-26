import Column, { IColumn } from "../../src/models/column";
import {IFieldProps} from "../../src/models/field.properties";
import Field from "../../src/models/field";
import Section, { ISection } from "../../src/models/section";
import Page, {IPage} from "../../src/models/page";
import FormStore from "../../src/state/FormStore";
import {when} from "mobx";

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

describe('Page', () => {
    let store: FormStore;

    beforeEach(() => {
        store = new FormStore({values: {"f1":"", "f2": ""}});
    });

    it("can be initialised", () => {
        let p = new Page(P1, store);
        expect(p.numSections).toEqual(0);
    });

    it("reacts to field property updates", async (done: any) => {
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        let p = new Page(P1, store);
        p.addSection(s);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        try {
            when(() => p.isValid == true, done);
            // Populate both fields
            c.fields[0].setValue("qq");
            c.fields[1].setValue("abcd");
        } catch (error) {
            fail(error);
        }
    })

    it("reacts to addSection", () => {
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        expect(p.isValid).toEqual(true);
        expect(p.numSections).toBe(0);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        p.addSection(s);
        expect(p.numSections).toBe(1);
        expect(p.numFields).toBe(2);
        expect(p.isValid).toEqual(false);
        expect(p.errors.length).toBe(1);
    });

    it("reacts to removeSection", () => {
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        s.addColumn(c);
        p.addSection(s);
        expect(p.numSections).toBe(1);
        expect(p.isValid).toEqual(false);
        p.removeSection(0);
        expect(p.numSections).toBe(0);
        expect(p.isValid).toEqual(true);
    });

    it("recieves field errors", () => {
        let p = new Page(P1, store);
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        s.addColumn(c);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        p.addSection(s);
        expect(p.errors.length).toBe(1)
        // Fill fields to remove error
        c.fields[0].setValue('qq');
        c.fields[1].setValue('abcd');
        expect(p.errors.length).toBe(0);
    });
});
