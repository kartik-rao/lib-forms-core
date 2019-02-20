import Condition from "../src/models/condition";
import FormStore from "../src/state/FormStore";
import Predicate from "../src/models/condition.predicate";
import { when, toJS } from "mobx";
import Field from "../src/models/field";

test("Can initialize a field and set its value", async (done: any) => {
    let store = new FormStore({values: {"f1": "", f2: ""}});
    let p = new Predicate({field: "f1", condition: "eq", value: "qq"}, store);
    let c = new Condition({fieldId: "f1", predicates: [p]}, store);

    let f = new Field({
        id: "f2",
        name: "f2",
        type: "string",
        inputType : "text",
        placeholder: "",
        location: {}
    }, store);

    try {
        when(() => f.value == "new value", () => {
            done();
        });
        f.setValue("new value");
    } catch (error) {
        fail(error);
    }
})

test("Can conditionally disable/enable", async (done: any) => {
    let store = new FormStore({values: {"f1": "", f2: ""}});
    let p = new Predicate({field: "f1", condition: "eq", value: "qq"}, store);
    let c = new Condition({fieldId: "f1", predicates: [p]}, store);

    let f = new Field({
        id: "f2",
        name: "f2",
        type: "string",
        inputType : "text",
        placeholder: "",
        location: {},
        condition: c
    }, store);

    try {
        let fired = {one: false, two: false};
        let checkDone = () => {
            if (fired.one && fired.two) {
                done();
            }
        }
        let dispose1 = when(() => f.isDisabled.valueOf() == false, () => {
            fired.one = true;
            checkDone();
            dispose1();
        });
        store.setFieldValue("f1", "qq");

        let dispose2 = when(() => f.isDisabled.valueOf() == true, () => {
            fired.two = true;
            checkDone();
            dispose2();
        });
        store.setFieldValue("f1", "xx");
    } catch (error) {
        fail(error);
    }
})


test("Can validate/revalidate on change", async (done: any) => {
    let store = new FormStore({values: {"f1": "", f2: ""}});
    let f = new Field({
        id: "f2",
        name: "f2",
        type: "string",
        inputType : "text",
        placeholder: "",
        location: {},
        validationRules: {
            presence: {message: 'Required validation message'},
            length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
        }
    }, store);

    try {
        expect(f.isValid).toEqual(false);
        when(() => f.value == 'qq', () => {
            expect(f.isValid).toEqual(true);
            done();
        });
        f.setValue("qq");
    } catch (error) {
        fail(error);
    }
})