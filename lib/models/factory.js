import { Column } from "./column";
import { Condition } from "./condition";
import { Predicate } from "./condition.predicate";
import { Field } from "./field";
import { Form } from "./form";
import { Page } from "./page";
import { Section } from "./section";
const uuidv1 = require('uuid/v1');
export const EmptyForm = {
    id: null,
    name: "Untitled Form",
    description: "Untitled Form",
    formLayoutOptions: {
        showPageTitles: true,
        showSteps: true,
        showSectionBorders: false,
        showPageBorders: false,
        showSectionTitles: false,
        validationDisablesPaging: true
    },
    layout: "vertical",
    itemLayoutOptions: {
        labelAlign: "left",
        labelCol: { "xl": { offset: 0, span: 8 } },
        wrapperCol: { "xl": { offset: 0, span: 16 } }
    }
};
export class Factory {
    static ensureIds(item) {
        if (!item['uuid']) {
            item['uuid'] = uuidv1();
        }
        if (!item['id']) {
            item['id'] = (1e6 * Math.random()).toFixed(0) + "";
        }
    }
    static makePredicates(store, ...predicates) {
        let response = [];
        predicates.forEach((predicate) => {
            Factory.ensureIds(predicate);
            response.push(new Predicate(predicate, store));
        });
        return response;
    }
    static makeCondition(store, condition) {
        let predicates = Factory.makePredicates(store, ...condition.predicates);
        return new Condition({ predicates: predicates }, store);
    }
    static makeFields(store, ...fields) {
        if (!fields || fields.length == 0) {
            return [];
        }
        return fields.reduce((r, f) => {
            Factory.ensureIds(f);
            r.push(new Field(Object.assign({}, f, { condition: f.condition }), store));
            return r;
        }, []);
    }
    static makeColumns(store, ...columns) {
        let response = [];
        if (!columns || columns.length == 0) {
            return response;
        }
        columns.forEach((c) => {
            Factory.ensureIds(c);
            let fields = Factory.makeFields(store, ...c.fields);
            if (!c.span) {
                c.span = Math.floor(24 / columns.length);
            }
            let column = new Column(Object.assign({}, c, { fields: fields }), store);
            response.push(column);
        });
        return response;
    }
    static makeSections(store, ...sections) {
        let response = [];
        if (!sections || sections.length == 0) {
            return [];
        }
        sections.forEach((s) => {
            Factory.ensureIds(s);
            let columns = s.columns && s.columns.length > 0 ? Factory.makeColumns(store, ...s.columns) : [];
            response.push(new Section(Object.assign({}, s, { columns: columns }), store));
        });
        return response;
    }
    static makePages(store, ...pages) {
        if (!pages || pages.length == 0) {
            return [];
        }
        let response = [];
        pages.forEach((page) => {
            Factory.ensureIds(page);
            let sections = Factory.makeSections(store, ...page.sections);
            response.push(new Page(Object.assign({}, page, { sections: sections }), store));
        });
        return response;
    }
    static makeForm(store, formData) {
        let form;
        if (formData && formData.content && formData.content.pages) {
            formData.content.pages = Factory.makePages(store, ...formData.content.pages);
            form = new Form(formData, store);
        }
        else {
            let _formData = formData ? formData : { id: null, content: { pages: [] } };
            form = new Form(_formData, store);
        }
        return form;
    }
}
