import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils'; // ES6
import sinon from "sinon";
import Field from '../../../src/models/field';
import { FieldTypes, ICheckboxGroupProps } from "../../../src/models/field.properties";
import FormStore from '../../../src/state/FormStore';
import { CheckboxGroupView } from '../../../src/views/partials/CheckboxGroupView';
import { genElementId } from "../../utils";

Enzyme.configure({ adapter: new Adapter() });

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.CheckboxGroupView", () => {
    let store: FormStore;
    let container: HTMLElement;

    afterAll(() => {
        document.body.removeChild(container);
        container = null;
    });

    beforeAll(()=> {
        store = new FormStore({values: {}});
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it("can render a checkboxgroup field", () => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Country",
            inputType: "select",
            valuePropName: ["f1"],
            componentProps: {
                defaultValue: ["NZ"],
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            } as ICheckboxGroupProps
        }, store);

        act(() => {
            ReactDOM.render(<CheckboxGroupView field={f} onChange={() => {}}/>, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applies cssClass
        expect(container.querySelectorAll(".fl-checkboxgroup-field").length).toEqual(1);
    });

    it("Sets onChange on inner component", () => {
        // Triggers onChange
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Country",
            inputType: FieldTypes.datepicker,
            valuePropName: ["f1"],
            componentProps: {
                defaultValue: ["NZ"],
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            } as ICheckboxGroupProps
        }, store);

        let onChange = sinon.spy();
        let wrapper = Enzyme.mount(<CheckboxGroupView field={f} onChange={onChange} />);
        wrapper.find('CheckboxGroup').first().prop('onChange')(null);
        expect(onChange.callCount).toBe(1);
    })
});