import {FormStoreType, Factory, IFieldProps, IColumn, ISection, IPage, Form, createFormStore} from "../../src/index";

const P1: IPage = {
    id: 'p1',
    sections: [],
    name: "Page 1"
}

const S1 : ISection = {
    id : "s1",
    name: "section 1",
    columns: []
}

const C1 : IColumn = {
    id: "c1",
    name: "Column 1",
    title: "The First Column",
    fields: []
}

const F1: IFieldProps = {
    id: "f1",
    name: "f1",
    type: "string",
    inputType : "text",
    placeholder: "",
    validation: {
        presence: {message: 'Required validation message'}
    },
    fieldOptions: {valuePropName: "f1"},
    componentProps: {
        placeholder: "Enter f1"
    }
};

const F2: IFieldProps = {
    id: "f2",
    name: "f2",
    type: "string",
    inputType : "text",
    condition: {predicates: [{field: "f1", condition: "eq", value: "qq"}]},
    validation: {
        presence: {message: 'Required validation message'}
    },
    fieldOptions: {valuePropName: "f2"},
    componentProps: {
        placeholder: "Enter f2"
    }
}

describe('Factory', () => {
    let store: FormStoreType;
    let factory: Factory;

    describe(".makeFields", () => {
        beforeEach(() => {
            store = createFormStore();
        });
        it("can create fields", () => {
            let fields = Factory.makeFields(store, F1, F2);
            expect(fields).toBeTruthy();
            expect(fields.length).toEqual(2);
        });

        it("created fields have observable condition state", () => {
            let fields = Factory.makeFields(store, F1, F2);
            expect(fields[1].conditionState).toEqual(false);
            fields[0].setValue("qq");
            expect(fields[1].conditionState).toEqual(true);
        });
        it("created fields have unique uuid", () => {
            let fields = Factory.makeFields(store, F1, F2);
            expect(fields[0].uuid == fields[1].uuid).toBeFalsy();
        });
        it("created fields have observable validation state", () => {
            let fields = Factory.makeFields(store, F1, F2);
            expect(fields[0].isValid).toEqual(false);
            expect(fields[1].isValid).toEqual(true);
            fields[0].setValue("qq");
            expect(fields[0].isValid).toEqual(true);
            expect(fields[1].isValid).toEqual(false);
        });
    });

    describe(".makeColumn", () => {
        beforeEach(() => {
            store = createFormStore();
        });
        it("can create columns", () => {
            let column = Factory.makeColumns(store, C1);
            expect(column[0].fields).toBeDefined();
            expect(column[0].fields.length).toBe(0);
            let fields = Factory.makeFields(store, F1, F2);
            column[0].addField(fields[0]);
            column[0].addField(fields[1]);
            expect(column[0].fields.length).toEqual(2);
        });

        it("created columns have observable validation state", () => {
            let column = Factory.makeColumns(store, C1)[0];
            expect(column.fields).toBeDefined();
            expect(column.fields.length).toBe(0);
            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(column.fields.length).toEqual(2);
            expect(column.isValid).toBe(false);
            fields[0].setValue("qq");
            expect(column.isValid).toBe(false);
            fields[1].setValue("abcd");
            expect(column.isValid).toBe(true);
        });
    });

    describe(".makeSection", () => {
        beforeEach(() => {
            store = createFormStore();
        });
        it("can create sections", () => {
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];
            expect(section.numColumns).toBe(0)
            section.addColumn(column);
            expect(section.numColumns).toEqual(1)
            expect(section.numFields).toBe(0);

            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(section.numFields).toEqual(2);
        });

        it("created sections have observable validation state", () => {
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];
            section.addColumn(column);
            expect(section.numFields).toBe(0);
            expect(section.errors.length).toBe(0);

            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(section.isValid).toEqual(false);

            expect(section.errors.length).toEqual(1);
            fields[0].setValue("qq");
            expect(section.isValid).toBe(false);
            expect(section.errors.length).toEqual(1);
            fields[1].setValue("abcd");
            expect(section.isValid).toBe(true);
        });
    });

    describe(".makePages", () => {
        beforeEach(() => {
            store = createFormStore();
        });
        it("can create pages", () => {
            let page = Factory.makePages(store, P1)[0]
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];
            expect(page.numSections).toBe(0);

            page.addSection(section);
            section.addColumn(column);
            expect(page.numSections).toBe(1);
            expect(page.numFields).toBe(0);

            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(page.numFields).toEqual(2);
        });

        it("created pages have observable validation state", () => {
            let page = Factory.makePages(store, P1)[0]
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];

            page.addSection(section);
            section.addColumn(column);
            expect(page.isValid).toBe(true);
            expect(page.errors.length).toBe(0);

            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(page.isValid).toEqual(false);

            expect(page.errors.length).toEqual(1);
            fields[0].setValue("qq");
            expect(page.isValid).toBe(false);
            expect(page.errors.length).toEqual(1);
            fields[1].setValue("abcd");
            expect(page.isValid).toBe(true);
        });
    });

    describe(".makeForm", () => {
        beforeEach(() => {
            store = createFormStore();
        });
        it("can create a form", () => {
            let form : Form = Factory.makeForm(store, {id : "form-1"});
            let page = Factory.makePages(store, P1)[0];
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];
            form.addPage(page);
            expect(form.numFields).toBe(0);

            page.addSection(section);
            section.addColumn(column);
            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(form.numFields).toEqual(2);
        });

        it("created form has observable validation state", () => {
            let form: Form = Factory.makeForm(store, {id: "form-1"});
            let page = Factory.makePages(store, P1)[0]
            let section = Factory.makeSections(store, S1)[0];
            let column = Factory.makeColumns(store, C1)[0];

            expect(form.isValid).toBe(true);
            expect(form.errors.length).toBe(0);

            form.addPage(page);
            page.addSection(section);
            section.addColumn(column);
            expect(form.isValid).toBe(true);
            expect(page.errors.length).toBe(0);

            let fields = Factory.makeFields(store, F1, F2);
            column.addField(fields[0]);
            column.addField(fields[1]);
            expect(form.isValid).toEqual(false);

            expect(page.errors.length).toEqual(1);
            fields[0].setValue("qq");
            expect(form.isValid).toBe(false);
            expect(form.errors.length).toEqual(1);
            fields[1].setValue("abcd");
            expect(form.isValid).toBe(true);
        });
    });
});
