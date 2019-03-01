import Column, { IColumn } from "../../src/models/column";
import {IFieldProps} from "../../src/models/field.properties";
import Field  from "../../src/models/field";
import FormStore from "../../src/state/FormStore";
import { when, toJS } from "mobx";

const F1: IFieldProps = {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    validation: {
        presence: {message: 'Required validation message'},
        length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
    },
    valuePropName: "f1",
    componentProps: {
        placeholder: "Enter f1"
    }
};

const F2: IFieldProps= {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validation: {
        presence: {message: 'Required validation message'}
    },
    valuePropName: "f2",
    componentProps: {
        placeholder: "Enter f2"
    }
};

const C1: IColumn = {
    id: "c1",
    name: "Column 1",
    title: "The First Column"
}

describe('Column', () => {
    let store: FormStore;
    beforeEach(() => {
        store = new FormStore({values: {"f1":"", "f2": ""}});
    });

    it("can be initialized", () => {
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        expect(c.numFields).toEqual(2);
    });

    it("reacts to field property updates", async (done: any) => {
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        let f2 = new Field(F2, store);
        c.addField(f1);
        c.addField(f2);
        try {
            when(() => c.isValid == true, done);
            // Populate both fields
            c.fields[0].setValue("qq");
            c.fields[1].setValue("abcd");
        } catch (error) {
            fail(error);
        }
    })

    it("reacts to addField", () => {
        let c = new Column(C1, store);
        let f1 = new Field(F1, store);
        c.addField(f1);
        c.fields[0].setValue("qq");
        expect(c.isValid).toEqual(true);

        // Add required field that fails validation
        c.addField(new Field(F2, store));
        expect(c.numFields).toEqual(2);
        expect(c.fields[1].isValidateable).toBe(true);
        expect(c.fields[1].isValid).toBe(false);

        // Should be invalid now
        expect(c.isValid).toEqual(false);

        // Now fix added field
        c.fields[1].setValue("f2val");
        // Should be valid now
        expect(c.isValid).toEqual(true);
    });

    it("reacts to removeField", () => {
        let c = new Column({
            id: "1",
            name: "Column 1",
            title: "The First Column",
            fields: []
        }, store);
        c.addField(new Field(F1, store));
        c.addField(new Field(F2, store));
        c.fields[0].setValue("qq");
        // F2 is in error state
        expect(c.isValid).toEqual(false);

        // Remove invalid field
        c.removeField(1);
        expect(c.numFields).toEqual(1);

        // Column should become valid now
        expect(c.isValid).toEqual(true);
    });

    it("receives field errors", () => {
        let c = new Column({
            id: "1",
            name: "Column 1",
            title: "The First Column"
        }, store);
        c.addField(new Field(F1, store));
        c.addField(new Field(F2, store));
        expect(c.errors).toBeDefined();
        expect(c.errors.length).toBe(1);
    });
})