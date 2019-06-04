import FormStore from "../../src/store/FormStore";
import { when, toJS, keys } from "mobx";
import Field from "../../src/models/field";
import {genElementId} from "../utils";

describe("Field", () => {
    let store: FormStore;
    beforeEach(() => {
        store = new FormStore();
    });

    it("Can initialize a field and set its value", async (done: any) => {
        let f = new Field({
            id: genElementId('field'),
            name: "f2",
            type: "string",
            inputType : "text",
            fieldOptions: {valuePropName: "firstName"},
            componentProps: {
                placeholder: "Enter first Name"
            }
         }, store);

        try {
            when(() => f.value == "new value", done);
            f.setValue("new value");
        } catch (error) {
            fail(error);
        }
    })

    it("Can conditionally disable/enable", async (done: any) => {
        let c = {predicates: [{field: "f1", condition: "eq", value: "qq"}]};

        let f = new Field({
            id: genElementId('field'),
            name: "f2",
            type: "string",
            inputType : "text",
            condition: c,
            fieldOptions: {valuePropName: "firstName"},
            componentProps: {
                placeholder: "Enter first Name"
            }
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


    it("Can validate/revalidate on change", async (done: any) => {
        let f = new Field({
            id: genElementId('field'),
            name: "f2",
            type: "string",
            inputType : "text",
            validation: {
                presence: {message: 'Required validation message'},
                length: {wrongLength: 'MinLength=2 validation message', minimum: 2}
            },
            fieldOptions: {valuePropName: "firstName"},
            componentProps: {
                placeholder: "Enter first Name"
            }
        }, store);

        try {
            expect(f.isValid).toEqual(false);
            expect(keys(f.validator.errors).length).toBeGreaterThan(0);
            when(() => f.value == 'qq', () => {
                expect(f.isValid).toEqual(true);
                done();
            });
            f.setValue("qq");
        } catch (error) {
            fail(error);
        }
    })
})
