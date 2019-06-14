import { Condition } from "../../src/models/condition";
import { FormStore } from "../../src/store/FormStore";

import { when } from "mobx";
// "eq",  "neq",  "gt",  "lt", "gteq", "lteq", "hasval", "nothasval"
describe('Condition', () => {
    it("can be initialised", () => {
        let store = new FormStore();
        let c = new Condition({predicates: [{field: "f1", condition: "eq", value: "qq"}]}, store);
        expect(c).toBeDefined();
    });
    it("checks for equality", (done) => {
        let store = new FormStore();
        let c = new Condition({predicates: [{field: "f1", condition: "eq", value: "qq"}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", "qq");
    });
    it("checks for inequality", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", "qq")
        let c = new Condition({predicates: [{field: "f1", condition: "neq", value: "qq"}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", "notqq");
    });
    it("checks for greater than", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", 100);
        let c = new Condition({predicates: [{field: "f1", condition: "gt", value: 500}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", 1000);
    });
    it("checks for less than", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", 100);
        let c = new Condition({predicates: [{field: "f1", condition: "lt", value: 100}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", 99);
    });
    it("checks for greater than equal to", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", 100);
        let c = new Condition({predicates: [{field: "f1", condition: "gteq", value: 100}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", 99);
    });
    it("checks for less than equal to", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", 100);
        let c = new Condition({predicates: [{field: "f1", condition: "lteq", value: 99}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", 99);
    });
    it("checks for value presence", (done) => {
        let store = new FormStore();
        let c = new Condition({predicates: [{field: "f1", condition: "hasval"}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", "avalue");
    });
    it("checks for value absence", (done) => {
        let store = new FormStore();
        store.setFieldValue("f1", "value");
        let c = new Condition({predicates: [{field: "f1", condition: "nothasval"}]}, store);
        when(() => c.value == true, done);
        store.setFieldValue("f1", null);
    });

})
