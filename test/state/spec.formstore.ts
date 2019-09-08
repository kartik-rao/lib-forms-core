import { toJS } from "mobx";
import { createFormStore, FormStoreType, IFieldProps, IPage, Factory } from "../../src/index";

const F1: IFieldProps= {
    id:  "f1",
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

const F2: IFieldProps = {
    id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    placeholder: "",
    condition: {predicates: [{field: F1.id, condition: "eq", value: "qq"}]},
    validation: {
        presence: {message: 'Required validation message'}
    },
    fieldOptions: {valuePropName: "f2"},
    componentProps: {
        placeholder: "Enter f2",
    }
};

const P1: IPage = {
    id: 'p1',
    sections: [{
        id: 's1',
        columns: [{
            id: "1",
            name: "Column 1",
            title: "The First Column",
            fields: [F1, F2]
        }],
        name: "Section 1"
    }],
    name: "Page 1"
}

describe('FormStore', () => {
    let store: FormStoreType;

    beforeAll(() => {
        store = createFormStore();
        let form = Factory.makeForm(store,{
            id: "spec.formstore",
            content: {pages: [P1]}
        })
        store.setForm(form);
        console.log("spec.formstore store.form", toJS(store.form));
    });

    it("fieldNames", () => {

        let names: string[];
        try {
            names = store.fieldNames;
        } catch (error) {
            fail(error);
        }
        expect(names).toBeDefined();
        expect(names.length).toBe(2);
        expect(names[0]).toBe(F1.name);
        expect(names[1]).toBe(F2.name);
    });
    it("isValid", () => {
        expect(store.isValid).toBe(false);
        store.idFieldMap[F1.id].setValue("qq");
        expect(store.isValid).toBe(false);
        store.idFieldMap[F2.id].setValue("abc");
        expect(store.isValid).toBe(true);
    });
});
