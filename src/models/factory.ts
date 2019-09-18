import { FormStoreType } from "../store/FormStore";
import { Column, IColumn } from "./column";
import { Condition, ICondition } from "./condition";
import { IPredicate, Predicate } from "./condition.predicate";
import { Field } from "./field";
import { IFieldProps, FieldTypes } from "./field.properties";
import { Form } from "./form";
import { IFormProps } from "./form.properties";
import { IPage, Page } from "./page";
import { ISection, Section } from "./section";
const uuidv1 = require('uuid/v1');

export const EmptyForm : IFormProps = {
    id: null,
    name: "Untitled Form",
    description: "Form description",
    formLayoutOptions : {
        showPageTitles : true,
        showSteps: true,
        showSectionBorders: false,
        showPageBorders: false,
        showSectionTitles: false,
        validationDisablesPaging: true
    },
    layout : "vertical",
    itemLayoutOptions : {
        labelAlign : "left",
        labelCol : {"xl" : {offset:0, span: 8}},
        wrapperCol : {"xl" : {offset:0, span: 16}}
    },
    content: {
        title: "Form title",
        subtitle: "Form subtitle"
    }
}

export class Factory {
    static ensureIds<T>(item: T) {
        if (!item['uuid']) {
            item['uuid'] = uuidv1();
        }

        if(!item['id']) {
            item['id'] = (1e6 * Math.random()).toFixed(0) + "";
        }
    }

    static makePredicates(store: FormStoreType, ...predicates: IPredicate[]) : Predicate[] {
        let response: Predicate[] = [];
        predicates.forEach((predicate: IPredicate) => {
            Factory.ensureIds(predicate);
            response.push(new Predicate(predicate, store));
        });
        return response;

    }

    static makeCondition(store: FormStoreType, condition: ICondition) : Condition {
        let predicates = Factory.makePredicates(store, ...condition.predicates);
        return new Condition({predicates: predicates}, store);
    }

    static makeFields(store: FormStoreType, ...fields: IFieldProps[]) : Field[] {
        if (!fields || fields.length == 0) {
            return <Field[]>[];
        }
        return fields.reduce((r: Field[], f: IFieldProps) => {
            Factory.ensureIds(f);
            if(f.inputType == FieldTypes.radiogroup || f.inputType == FieldTypes.checkboxgroup || f.inputType == FieldTypes.select) {
                if (!f.componentProps) {
                    f.componentProps = {};
                }
                f.componentProps["options"] = f.componentProps["options"] || [];
            }
            r.push(new Field({...f, condition: f.condition}, store));
            return r;
        }, <Field[]>[]);
    }

    static makeColumns(store: FormStoreType, ...columns: IColumn[]) : Column[] {
        let response : Column[] = [];
        if (!columns || columns.length == 0) {
            return response;
        }

        columns.forEach((c: IColumn) => {
            Factory.ensureIds(c);
            let fields = c.fields && c.fields.length > 0 ? Factory.makeFields(store, ...c.fields) : <Field[]>[];
            if (!c.span) {
                c.span = Math.floor(24/columns.length);
            }
            let column = new Column({...c, fields: fields}, store);
            response.push(column);
        })
        return response;
    }

    static makeSections(store: FormStoreType, ...sections: ISection[]) : Section[] {
        let response: Section[] = [];
        if (!sections || sections.length == 0) {
            return <Section[]>[];
        }
        sections.forEach((s: ISection) => {
            Factory.ensureIds(s);
            let columns = s.columns && s.columns.length > 0 ? Factory.makeColumns(store, ...s.columns) : <Column[]>[];
            response.push(new Section({...s, columns: columns}, store));
        });
        return response;
    }

    static makePages(store: FormStoreType, ...pages: IPage[]) : Page[] {
        if (!pages || pages.length == 0) {
            return <Page[]>[];
        }
        let response: Page[] = [];
        pages.forEach((page: IPage) => {
            Factory.ensureIds(page);
            let sections = page.sections && page.sections.length > 0 ? Factory.makeSections(store, ...page.sections) : <Section[]>[];
            response.push(new Page({...page, sections: sections}, store));
        });
        return response;
    }

    static makeForm(store: FormStoreType, formData: IFormProps) : Form {
        let form: Form;
        if (formData && formData.content && formData.content.pages) {
            formData.content.pages = Factory.makePages(store, ...formData.content.pages)
            form = new Form(formData, store);
        } else {
            let _formData = formData ? formData : {id: null, content: {pages: []}}
            form = new Form(_formData, store);
        }
        return form;
    }
}