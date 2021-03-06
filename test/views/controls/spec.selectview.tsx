import { Select } from "antd";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils'; // ES6
import sinon from "sinon";
import { Field, FieldTypes, ISelectProps, FormStore, SelectView } from "../../../src/index";
import { genElementId } from "../../utils";

Enzyme.configure({ adapter: new Adapter() });

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.SelectView", () => {
    let store: FormStore;
    let container: HTMLElement;

    afterAll(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeAll(()=> {
        store = new FormStore();
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a select field", () => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            inputType: FieldTypes.select,
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                defaultValue: "NZ",
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            } as ISelectProps
        }, store);

        act(() => {
            ReactDOM.render(<SelectView field={f} onChange={() => {}}/>, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applies cssClass
        expect(container.querySelectorAll(".fl-select-field").length).toEqual(1);
        // Renders input
        expect(container.querySelectorAll('div.ant-select-selection').length).toEqual(1);
    });

    it("Sets onChange on inner component", () => {
        // Triggers onChange
        let f: Field = new Field({
            id: genElementId("field"),
            name: "First Name",
            inputType: FieldTypes.select,
            fieldOptions : {
                valuePropName: "f1"
            },
            componentProps: {
                defaultValue: "NZ",
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            } as ISelectProps
        }, store);

        let onChange = sinon.spy();
        let wrapper = Enzyme.mount(<SelectView field={f} onChange={onChange} />);
        wrapper.find(Select).first().prop('onChange')("AU", null);
        expect(onChange.callCount).toBeGreaterThan(0);
        expect(onChange.getCalls()[0].args).toBeDefined();
        expect(onChange.getCalls()[0].args.length).toBeGreaterThan(0);
        expect(onChange.getCalls()[0].args[0]).toEqual("AU");
    })
});