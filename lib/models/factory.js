import Page from "./page";
import Field from "./field";
import Column from "./column";
import Section from "./section";
import Form from "./form";
import Condition from "./condition";
import Predicate from "./condition.predicate";
export class Factory {
    constructor(store) {
        this.store = store;
    }
    makeSections(...sections) {
        let response = [];
        if (!sections || sections.length == 0) {
            return [];
        }
        sections.forEach((s) => {
            let columns = s.columns && s.columns.length > 0 ? this.makeColumns(...s.columns) : [];
            response.push(new Section(Object.assign({}, s, { columns: columns }), this.store));
        });
        return response;
    }
    makeColumns(...columns) {
        let response = [];
        if (!columns || columns.length == 0) {
            return response;
        }
        columns.forEach((c) => {
            let fields = this.makeFields(...c.fields);
            let column = new Column(Object.assign({}, c, { fields: fields }), this.store);
            response.push(column);
        });
        return response;
    }
    makePredicates(...predicates) {
        let response = [];
        predicates.forEach((predicate) => {
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
            r.push(new Field(Object.assign({}, f, { condition: f.condition }), this.store));
            return r;
        }, []);
    }
    makePages(...pages) {
        if (!pages || pages.length == 0) {
            return [];
        }
        let response = [];
        pages.forEach((page) => {
            let sections = this.makeSections(...page.sections);
            response.push(new Page(Object.assign({}, page, { sections: sections }), this.store));
        });
        return response;
    }
    makeForm(formData) {
        if (formData && formData.content && formData.content.pages) {
            formData.content.pages = this.makePages(...formData.content.pages);
            return new Form(formData, this.store);
        }
        else {
            let _formData = formData ? formData : { id: null, content: { pages: [] } };
            return new Form(_formData, this.store);
        }
    }
}
