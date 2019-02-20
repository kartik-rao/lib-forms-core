import Condition from "../src/models/condition";
import FormStore from "../src/state/FormStore";

jest.setTimeout(1000)

import { when } from "mobx";

test("Can initialize a condition", async (done: any) => {
    let store = new FormStore({values: {"f1": ""}});
    let c = new Condition({predicates: [{field: "f1", condition: "eq", value: "qq"}]}, store);
    try {
        when(() => c.value == true, done);
        store.setFieldValue("f1", "qq");
    } catch (error) {
        fail(error);
    }
})