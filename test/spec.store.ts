import FormStore from "../src/state/FormStore";
import {autorun, toJS, when} from "mobx";

test("Can initialize store", async (done) => {
    let store = new FormStore({values: {"f1":""}});
    when(()=> store.values.f1 == "qq", done);
    store.setFieldValue("f1", "qq");
});