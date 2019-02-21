import FormStore from "../src/state/FormStore";
import {when} from "mobx";

describe('Store', () => {
    it("can be initialized", async (done) => {
        let store = new FormStore({values: {"f1":""}});
        when(()=> store.values.f1 == "qq", done);
        store.setFieldValue("f1", "qq");
    });
});
