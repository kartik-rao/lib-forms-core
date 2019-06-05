import FormStore from "../store/FormStore";
import Column, { IColumn } from "./column";
import { uuid } from "./common";
import Condition, { ICondition } from "./condition";
import Predicate, { IPredicate } from "./condition.predicate";
import Field from "./field";
import { IFieldProps } from "./field.properties";
import Form from "./form";
import { IFormProps } from "./form.properties";
import Page, { IPage } from "./page";
import Section, { ISection } from "./section";

export class Factory {
    store: FormStore;

    constructor(store: FormStore) {
        this.store = store;
    }

    setUUID<T>(item: T) {
        if (!item['uuid']) {
            item['uuid'] = uuid();
        }
    }

    makePredicates(...predicates: IPredicate[]) : Predicate[] {
        let response: Predicate[] = [];
        predicates.forEach((predicate: IPredicate) => {
            this.setUUID(predicate);
            response.push(new Predicate(predicate, this.store));
        });
        return response;

    }

    makeCondition(condition: ICondition) : Condition {
        let predicates = this.makePredicates(...condition.predicates);
        return new Condition({predicates: predicates}, this.store);
    }

    makeFields(...fields: IFieldProps[]) : Field[] {
        if (!fields || fields.length == 0) {
            return <Field[]>[];
        }
        return fields.reduce((r: Field[], f: IFieldProps) => {
            this.setUUID(f);
            r.push(new Field({...f, condition: f.condition}, this.store));
            return r;
        }, <Field[]>[]);
    }

    makeColumns(...columns: IColumn[]) : Column[] {
        let response : Column[] = [];
        if (!columns || columns.length == 0) {
            return response;
        }

        columns.forEach((c: IColumn) => {
            this.setUUID(c);
            let fields = this.makeFields(...c.fields);
            let column = new Column({...c, fields: fields}, this.store);
            response.push(column);
        })
        return response;
    }

    makeSections(...sections: ISection[]) : Section[] {
        let response: Section[] = [];
        if (!sections || sections.length == 0) {
            return <Section[]>[];
        }
        sections.forEach((s: ISection) => {
            this.setUUID(s);
            let columns = s.columns && s.columns.length > 0 ? this.makeColumns(...s.columns) : <Column[]>[];
            response.push(new Section({...s, columns: columns}, this.store));
        });
        return response;
    }

    makePages(...pages: IPage[]) : Page[] {
        if (!pages || pages.length == 0) {
            return <Page[]>[];
        }
        let response: Page[] = [];
        pages.forEach((page: IPage) => {
            this.setUUID(page);
            let sections = this.makeSections(...page.sections);
            response.push(new Page({...page, sections: sections}, this.store));
        });
        return response;
    }

    makeForm(formData: IFormProps) : Form {
        let form: Form;
        if (formData && formData.content && formData.content.pages) {
            formData.content.pages = this.makePages(...formData.content.pages)
            form = new Form(formData, this.store);
        } else {
            let _formData = formData ? formData : {id: null, content: {pages: []}}
            form = new Form(_formData, this.store);
        }
        this.store.setForm(form);
        return form;
    }
}