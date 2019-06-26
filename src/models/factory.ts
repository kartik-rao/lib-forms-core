import { FormStore } from "../store/FormStore";
import { Column, IColumn } from "./column";
import { Condition, ICondition } from "./condition";
import { IPredicate, Predicate } from "./condition.predicate";
import { Field } from "./field";
import { IFieldProps } from "./field.properties";
import { Form } from "./form";
import { IFormProps } from "./form.properties";
import { IPage, Page } from "./page";
import { ISection, Section } from "./section";
const uuidv1 = require('uuid/v1');

export class Factory {
    store: FormStore;

    constructor(store: FormStore) {
        this.store = store;
    }

    ensureIds<T>(item: T) {
        if (!item['uuid']) {
            item['uuid'] = uuidv1();
        }

        if(!item['id']) {
            item['id'] = (1e6 * Math.random()).toFixed(0) + "";
        }
    }

    makePredicates(...predicates: IPredicate[]) : Predicate[] {
        let response: Predicate[] = [];
        predicates.forEach((predicate: IPredicate) => {
            this.ensureIds(predicate);
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
            this.ensureIds(f);
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
            this.ensureIds(c);
            let fields = this.makeFields(...c.fields);
            if (!c.span) {
                c.span = Math.floor(24/columns.length);
            }
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
            this.ensureIds(s);
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
            this.ensureIds(page);
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