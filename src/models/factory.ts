import Page, {IPage} from "./page";
import Field, {IField} from "./field";
import Column, {IColumn} from "./column";
import Section, {ISection} from "./section";
import Form, {IFormProps} from "./form";
import FormStore from "../state/FormStore";
import Condition from "./condition";

export class Factory {
    store: FormStore;

    constructor(store: FormStore) {
        this.store = store;
    }

    makeSections(...sections: ISection[]) {
        let response: ISection[] = [];
        sections.forEach((s: ISection) => {
            s.columns = this.makeColumns(...s.columns);
            response.push(new Section(s, this.store));
        });
        return response;
    }

    makeColumns(...columns: IColumn[]) : Column[] {
        let response : Column[] = [];
        columns.forEach((c)=> {
            c.fields = this.makeFields(...c.fields);
        })
        return response;
    }

    makeFields(...fields: IField[]) : Field[] {
        let response : Field[] = [];
        let self = this;
        fields.forEach((f:IField) => {
            if (f.condition) {
                f.condition = new Condition(f.condition, self.store)
            }
            response.push(new Field(f, this.store))
        })
        return response;
    }

    makePages(...pages: IPage[]) : Page[] {
        let response: Page[] = [];
        pages.forEach((page: IPage)=> {
            response.push(new Page(page, this.store));
        });
        return response;
    }

    makeForm(formData: IFormProps) : Form {
        if (formData)
        formData.content.pages = this.makePages(...formData.content.pages)
        return new Form(formData, this.store);
    }

    makePredicate() {}
    makeCondition() {}
}