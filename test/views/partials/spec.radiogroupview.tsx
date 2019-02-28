import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import {RadioGroupView} from '../../../src/views/controls/RadioGroupView';
import Field from '../../../src/models/field';
import FormStore from '../../../src/state/FormStore';
import {FieldTypes, IRadioGroupProps} from "../../../src/models/field.properties";
import {genElementId, printPrettyHtml} from "../../utils";
import sinon from "sinon";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.RadioGroupView", () => {
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

    it("can render a radiogroup field", () => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Country",
            inputType: FieldTypes.radiogroup,
            valuePropName: "f1",
            componentProps: {
                defaultValue: "NZ",
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            } as IRadioGroupProps
        }, store);

        act(() => {
            ReactDOM.render(<RadioGroupView field={f} onChange={() => {}}/>, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applies cssClass
        expect(container.querySelectorAll(".fl-radiogroup-field").length).toEqual(1);
    });

    it("Sets onChange on inner component", () => {
        // Triggers onChange
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Country",
            inputType: "select",
            valuePropName: "f1",
            componentProps: {
                defaultValue: "NZ",
                options : [{
                    label: "Australia",
                    value: "AU"
                }, {
                    label: "New Zealand",
                    value: "NZ"
                }]
            }
        }, store);

        let onChange = sinon.spy();
        let wrapper = Enzyme.mount(<RadioGroupView field={f} onChange={onChange} />);
        wrapper.find('RadioGroup').first().prop('onChange')(null);
        expect(onChange.callCount).toBe(1);
    })
});