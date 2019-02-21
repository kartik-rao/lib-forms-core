import Column, { IColumn } from "../src/models/column";
import Field, { IField } from "../src/models/field";
import Section, {ISection} from "../src/models/section";

import FormStore from "../src/state/FormStore";
import { when, toJS } from "mobx";

jest.setTimeout(1000)

const store = new FormStore({values: {"f1": ""}});

const F1 :IField= {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {},
    validationRules: {
        presence: {message: 'Required validation message'},
        length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
    }
};

const F2 : IField = {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {},
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validationRules: {
        presence: {message: 'Required validation message'}
    }
};

const C1 : IColumn = {
    id: 1,
    name: "Column 1",
    title: "The First Column",
    fields: [new Field(F1, store), new Field(F2, store)]
}

const S1 : ISection = {
    id: 's1',
    columns: [],
    name: "Section 1",
    store: store
}

test("Can initialize a section", () => {
    let s = new Section(S1, store);
    expect(s.numColumns).toEqual(0);
});

// test(" reacts to field property updates", async (done: any) => {
//     let c = new Column(C1, store);
//     try {
//         when(() => c.isValid == true, done);
//         // Populate both fields
//         c.fields[0].setValue("qq");
//         c.fields[1].setValue("abcd");
//     } catch (error) {
//         fail(error);
//     }
// })

test("Section reacts to addColumn", () => {
    let s = new Section(S1, store);
    expect(s.isValid).toEqual(true);
    expect(s.numColumns).toBe(0);
    s.addColumn(new Column(C1, store));
    expect(s.isValid).toEqual(false);
    expect(s.numColumns).toBe(1);
});

test("Section reacts to removeColumn", () => {
    let s = new Section(S1, store);
    let c = new Column(C1, store);
    s.addColumn(c)
    expect(s.numColumns).toBe(1);
    expect(s.isValid).toEqual(false);
    s.removeColumn(0);
    expect(s.numColumns).toBe(0);
    expect(s.isValid).toEqual(true);
});

test("Section recieves field errors", () => {
    let s = new Section(S1, store);
    let c = new Column(C1, store);
    s.addColumn(c);
    expect(s.errors).toBeDefined();
    expect(s.errors.length).toBe(1);
    // Fill fields to remove error
    c.fields[0].setValue('qq');
    c.fields[1].setValue('abcd');
    expect(s.errors.length).toBe(0);
});