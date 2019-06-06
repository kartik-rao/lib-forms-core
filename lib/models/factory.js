import Column from "./column";
const uuidv1 = require('uuid/v1');
import Condition from "./condition";
import Predicate from "./condition.predicate";
import Field from "./field";
import Form from "./form";
import Page from "./page";
import Section from "./section";
export class Factory {
    constructor(store) {
        this.store = store;
    }
    setUUID(item) {
        if (!item['uuid']) {
            item['uuid'] = uuidv1();
        }
    }
    makePredicates(...predicates) {
        let response = [];
        predicates.forEach((predicate) => {
            this.setUUID(predicate);
            response.push(new Predicate(predicate, this.store));
        });
        return response;
    }
    makeCondition(condition) {
        let predicates = this.makePredicates(...condition.predicates);
        return new Condition({ predicates: predicates }, this.store);
    }
    makeFields(...fields) {
        if (!fields || fields.length == 0) {
            return [];
        }
        return fields.reduce((r, f) => {
            this.setUUID(f);
            r.push(new Field(Object.assign({}, f, { condition: f.condition }), this.store));
            return r;
        }, []);
    }
    makeColumns(...columns) {
        let response = [];
        if (!columns || columns.length == 0) {
            return response;
        }
        columns.forEach((c) => {
            this.setUUID(c);
            let fields = this.makeFields(...c.fields);
            let column = new Column(Object.assign({}, c, { fields: fields }), this.store);
            response.push(column);
        });
        return response;
    }
    makeSections(...sections) {
        let response = [];
        if (!sections || sections.length == 0) {
            return [];
        }
        sections.forEach((s) => {
            this.setUUID(s);
            let columns = s.columns && s.columns.length > 0 ? this.makeColumns(...s.columns) : [];
            response.push(new Section(Object.assign({}, s, { columns: columns }), this.store));
        });
        return response;
    }
    makePages(...pages) {
        if (!pages || pages.length == 0) {
            return [];
        }
        let response = [];
        pages.forEach((page) => {
            this.setUUID(page);
            let sections = this.makeSections(...page.sections);
            response.push(new Page(Object.assign({}, page, { sections: sections }), this.store));
        });
        return response;
    }
    makeForm(formData) {
        let form;
        if (formData && formData.content && formData.content.pages) {
            formData.content.pages = this.makePages(...formData.content.pages);
            form = new Form(formData, this.store);
        }
        else {
            let _formData = formData ? formData : { id: null, content: { pages: [] } };
            form = new Form(_formData, this.store);
        }
        this.store.setForm(form);
        return form;
    }
}
