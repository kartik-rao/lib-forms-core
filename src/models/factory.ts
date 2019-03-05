import Page, {IPage} from "./page";
import {IFieldProps} from "./field.properties";
import Field from "./field";
import Column, {IColumn} from "./column";
import Section, {ISection} from "./section";
import {IFormProps} from "./form.properties";
import Form from "./form";
import FormStore from "../store/FormStore";
import Condition, {ICondition} from "./condition";
import Predicate, {IPredicate} from "./condition.predicate";
import { uuid } from "./common";

export class Factory {
    store: FormStore;

    constructor(store: FormStore) {
        this.store = store;
    }

    makePredicates(...predicates: IPredicate[]) : Predicate[] {
        let response: Predicate[] = [];
        predicates.forEach((predicate: IPredicate) => {
            if(!predicate.uuid) {
                predicate.uuid = uuid();
            }
            response.push(new Predicate(predicate, this.store));
        });
        return response;

    }

    makeCondition(condition: ICondition) {
        let predicates = this.makePredicates(...condition.predicates);
        return new Condition({predicates: predicates}, this.store);
    }

    makeFields(...fields: IFieldProps[]) : Field[] {
        if (!fields || fields.length == 0) {
            return <Field[]>[];
        }
        return fields.reduce((r: Field[], f:IFieldProps) => {
            r.push(new Field({...f, condition: f.condition}, this.store));
            return r;
        }, <Field[]>[]);
    }

    makeColumns(...columns: IColumn[]) : Column[] {
        let response : Column[] = [];
        if (!columns || columns.length == 0) {
            return response;
        }

        columns.forEach((c: IColumn)=> {
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