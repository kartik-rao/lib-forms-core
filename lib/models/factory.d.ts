import Page, { IPage } from "./page";
import { IFieldProps } from "./field.properties";
import Field from "./field";
import Column, { IColumn } from "./column";
import Section, { ISection } from "./section";
import { IFormProps } from "./form.properties";
import Form from "./form";
import FormStore from "../store/FormStore";
import Condition, { ICondition } from "./condition";
import Predicate, { IPredicate } from "./condition.predicate";
export declare class Factory {
    store: FormStore;
    constructor(store: FormStore);
    makePredicates(...predicates: IPredicate[]): Predicate[];
    makeCondition(condition: ICondition): Condition;
    makeFields(...fields: IFieldProps[]): Field[];
    makeColumns(...columns: IColumn[]): Column[];
    makeSections(...sections: ISection[]): Section[];
    makePages(...pages: IPage[]): Page[];
    makeForm(formData: IFormProps): Form;
}
