import Condition from "../src/models/condition";
import FormStore from "../src/state/FormStore";
import Predicate from "../src/models/condition.predicate";
import { when } from "mobx";

test("Can initialize a condition", async (done: any) => {
    let store = new FormStore({values: {"f1": ""}});
    let p = new Predicate({field: "f1", condition: "eq", value: "qq"}, store);
    let c = new Condition({fieldId: "f1", predicates: [p]}, store);
    try {
        when(() => c.value == true, done);
        store.setFieldValue("f1", "qq");
    } catch (error) {
        console.log(error);
        fail();
    }
})