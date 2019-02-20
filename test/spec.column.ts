import Column from "../src/models/column";
import Field from "../src/models/field";
import FormStore from "../src/state/FormStore";
import { when } from "mobx";

jest.setTimeout(1000)

const store = new FormStore({values: {"f1": ""}});

const F1 = {
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

const F2 = {id: "f2",
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

const C1 = {
    id: 1,
    name: "Column 1",
    title: "The First Column",
    fields: [new Field(F1, store), new Field(F2, store)]
}

test("Can initialize a column", () => {
    let c = new Column(C1, store);
    expect(c.numFields).toEqual(2);
});

test("Column reacts to field updates", async (done: any) => {
    let c = new Column(C1, store);
    try {
        when(() => c.isValid == true, done);
        // Populate both fields
        store.setFieldValue("f1", "qq");
        store.setFieldValue("f2", "abcd");
    } catch (error) {
        fail(error);
    }
})