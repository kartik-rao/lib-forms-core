import Condition from "../src/models/condition";
import FormStore from "../src/state/FormStore";

import { when } from "mobx";

describe('Condition', () => {
    it("can be initialised", async (done: any) => {
        let store = new FormStore({values: {"f1": ""}});
        let c = new Condition({predicates: [{field: "f1", condition: "eq", value: "qq"}]}, store);
        try {
            when(() => c.value == true, done);
            store.setFieldValue("f1", "qq");
        } catch (error) {
            fail(error);
        }
    })
})
