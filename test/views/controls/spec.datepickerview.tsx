import { configure } from 'mobx';
import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from 'react-dom/test-utils'; // ES6
import {DatePickerView} from '../../../src/views/controls/DatePickerView';
import Field from '../../../src/models/field';
import FormStore from '../../../src/state/FormStore';
import {genElementId} from "../../utils";
import sinon from "sinon";
import {FieldTypes, IDatePickerProps} from "../../../src/models/field.properties";
import { DatePicker } from "antd";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';

Enzyme.configure({ adapter: new Adapter() });

// Dont allow store mutations outside of actions!!
configure({enforceActions: "always"});

describe("FieldView.DatePickerView", () => {
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

    it("can render a datepicker field", () => {
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Date of Birth",
            inputType: FieldTypes.datepicker,
            valuePropName: "f1",
            componentProps: {
                placeholder: "Enter DOB",
            } as IDatePickerProps
        }, store);

        let onChange = sinon.spy();

        act(() => {
            ReactDOM.render(<DatePickerView field={f} onChange={onChange} />, container);
        });

        // Populates ID
        expect(container.querySelector("#"+f.id)).toBeDefined();
        // Populates UUID
        expect(container.querySelectorAll(`div[data-uuid='${f.uuid}']`).length).toEqual(1);
        // Applied cssClass
        expect(container.querySelectorAll(".fl-datepicker-field").length).toEqual(1);
        // Renders input
        expect(container.querySelectorAll('input').length).toEqual(1);
    });

    it("Sets onChange on inner component", () => {
        // Triggers onChange
        let f: Field = new Field({
            id: genElementId("field"),
            name: "Date of Birth",
            inputType: FieldTypes.datepicker,
            valuePropName: "f1",
            componentProps: {
                placeholder: "Enter DOB",
            } as IDatePickerProps
        }, store);

        let onChange = sinon.spy();
        let wrapper = Enzyme.mount(<DatePickerView field={f} onChange={onChange} />);

        let d = moment();
        wrapper.find(DatePicker).first().prop('onChange')(d, "");
        expect(onChange.callCount).toBe(1);
        expect(onChange.getCalls()[0].args).toBeDefined();
        expect(onChange.getCalls()[0].args.length).toBe(1);
        expect(onChange.getCalls()[0].args[0]).toEqual(d.format(moment.HTML5_FMT.DATE));
    })

});