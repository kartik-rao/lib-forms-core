import { when } from "mobx";
import {Column, IColumn, Field, IFieldProps, ISection, Section, FormStoreType, createFormStore} from "../../src//index";
import { genElementId } from "../utils";

let f1_id = genElementId('field');

const F1: IFieldProps = {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    validation: {
        presence: {message: 'Required validation message'},
        length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
    },
    fieldOptions: {valuePropName: "f1"},
    componentProps: {
        placeholder: "Enter f1"
    }
};

const F2: IFieldProps= {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    condition: {predicates: [{field: f1_id, condition: "eq", value: "qq"}]},
    validation: {
        presence: {message: 'Required validation message'}
    },
    fieldOptions: {valuePropName: "f2"},
    componentProps: {
        placeholder: "Enter f2"
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

describe('Section', () => {
    let store: FormStoreType;

    beforeEach(() => {
        store = createFormStore();
    });

    it("can be initialised", () => {
        let s = new Section(S1, store);
        expect(s.numColumns).toEqual(0);
    });

    it("reacts to field property updates", async (done: any) => {
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        try {
            when(() => s.isValid == true, done);
            // Populate both fields
            c.fields[0].setValue("qq");
            c.fields[1].setValue("abcd");
        } catch (error) {
            fail(error);
        }
    })

    it("reacts to addColumn", () => {
        let s = new Section(S1, store);
        expect(s.isValid).toEqual(true);
        expect(s.numColumns).toBe(0);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        s.addColumn(c);
        c.addField(f1);
        c.addField(f2);
        expect(s.numColumns).toBe(1);
        expect(s.isValid).toEqual(false);
        expect(s.numColumns).toBe(1);
    });

    it("reacts to removeColumn", () => {
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        s.addColumn(c)
        expect(s.numColumns).toBe(1);
        expect(s.isValid).toEqual(false);
        s.removeColumn(0);
        expect(s.numColumns).toBe(0);
        expect(s.isValid).toEqual(true);
    });

    it("recieves field errors", () => {
        let s = new Section(S1, store);
        let c = new Column(C1, store);
        s.addColumn(c);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        expect(s.errors).toBeDefined();
        expect(s.errors.length).toBe(1);
        // Fill fields to remove error
        c.fields[0].setValue('qq');
        c.fields[1].setValue('abcd');
        expect(s.errors.length).toBe(0);
    });
});
