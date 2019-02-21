import FormStore from "../src/state/FormStore";
import { Factory } from "../src/models/factory";
import { IField } from "../src/models/field";
import { IColumn } from "../src/models/column";
import { ISection } from "../src/models/section";
import {toJS}from "mobx";
const S1 : ISection = {
    id : "s1",
    name: "section 1"
}

const C1 : IColumn = {
    id: "c1",
    name: "Column 1",
    title: "The First Column",
    fields: []
}

const F1: IField = {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {},
    validationRules: {
        presence: {message: 'Required validation message'}
    }
};

const F2: IField = {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {},
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validationRules: {
        presence: {message: 'Required validation message'}
    }
}

describe('Factory', () => {
    let store: FormStore;
    let factory: Factory;

    describe(".makeFields", () => {
        beforeEach(() => {
            store = new FormStore({values: {"f1":"", "f2": ""}});
            factory = new Factory(store);
        });
        it("can create fields", () => {
            let fields = factory.makeFields(F1, F2);
            expect(fields).toBeTruthy();
            expect(fields.length).toEqual(2);
        });

        it("created fields have observable condition state", () => {
            let fields = factory.makeFields(F1, F2);
            expect(fields[1].conditionState).toEqual(false);
            fields[0].setValue("qq");
            expect(fields[1].conditionState).toEqual(true);
        });

        it("created fields have observable validation state", () => {
            let fields = factory.makeFields(F1, F2);
            expect(fields[0].isValid).toEqual(false);
            expect(fields[1].isValid).toEqual(true);
            fields[0].setValue("qq");
            expect(fields[0].isValid).toEqual(true);
            expect(fields[1].isValid).toEqual(false);
        });
    });

    describe(".makeColumn", () => {
        beforeEach(() => {
            store = new FormStore({values: {"f1":"", "f2": ""}});
            factory = new Factory(store);
        });
        it("can create columns", () => {
            let column = factory.makeColumns(C1);
            expect(column[0].fields).toBeDefined();
            expect(column[0].fields.length).toEqual(0);
            let fields = factory.makeFields(F1, F2);
            column[0].addField(fields[0]);
            column[0].addField(fields[1]);
            expect(column[0].fields.length).toEqual(2);
        });

        it("created columns have observable validation state", () => {
            let column = factory.makeColumns(C1)[0];
            expect(column.fields).toBeDefined();
            expect(column.fields.length).toEqual(0);
            let fields = factory.makeFields(F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(column.fields.length).toEqual(2);
            expect(column.isValid).toBe(false);
            fields[0].setValue("qq");
            expect(column.isValid).toBe(false);
            fields[1].setValue("abcd");
            expect(column.isValid).toBe(true);
        });
    });

    describe(".makeSection", () => {
        beforeEach(() => {
            store = new FormStore({values: {"f1":"", "f2": ""}});
            factory = new Factory(store);
        });
        it("can create sections", () => {
            let section = factory.makeSections(S1)[0];
            let column = factory.makeColumns(C1)[0];
            expect(section.numColumns).toEqual(0)
            section.addColumn(column);
            expect(section.numColumns).toEqual(1)
            expect(section.numFields).toEqual(0);

            let fields = factory.makeFields(F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(section.numFields).toEqual(2);
        });

        it("created sections have observable validation state", () => {
            let section = factory.makeSections(S1)[0];
            let column = factory.makeColumns(C1)[0];
            section.addColumn(column);
            expect(section.numFields).toEqual(0);
            expect(section.errors.length).toBe(0);

            let fields = factory.makeFields(F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(section.isValid).toEqual(false);

            expect(section.errors.length).toEqual(1);
            fields[0].setValue("qq");
            expect(section.isValid).toBe(false);
            expect(section.errors.length).toEqual(1);
            fields[1].setValue("abcd");
            expect(section.isValid).toBe(true);
        });
    });

});
