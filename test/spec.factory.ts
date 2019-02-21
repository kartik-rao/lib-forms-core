import FormStore from "../src/state/FormStore";
import { Factory } from "../src/models/factory";

let store = new FormStore({values: {"f1":""}});
const F1 = {id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {},
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]}
}
const F2 = {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    placeholder: "",
    location: {}
};

describe('Factory', () => {
    it("can create fields", () => {
        let factory = new Factory(store);
        let fields = factory.makeFields(
            {id: "f2",
            name: "f2",
            type: "string",
            inputType : "text",
            placeholder: "",
            location: {},
            condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]}
        }, {
            id: "f1",
            name: "f1",
            type: "string",
            inputType : "text",
            placeholder: "",
            location: {}
        });

        expect(fields).toBeTruthy();
        expect(fields.length).toEqual(2);
    });

    it("created fields are connected to the store", () => {
        let factory = new Factory(store);
        let fields = factory.makeFields(F1, F2);
        expect(fields[0].conditionState).toEqual(false);
        store.setFieldValue("f1", "qq");
        expect(fields[0].conditionState).toEqual(true);
    });
});
