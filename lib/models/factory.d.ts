import Page, { IPage } from "./page";
import Field, { IField } from "./field";
import Column, { IColumn } from "./column";
import Section, { ISection } from "./section";
import Form, { IFormProps } from "./form";
import FormStore from "../state/FormStore";
import Condition, { ICondition } from "./condition";
import Predicate, { IPredicate } from "./condition.predicate";
export declare class Factory {
    store: FormStore;
    constructor(store: FormStore);
    makeSections(...sections: ISection[]): Section[];
    makeColumns(...columns: IColumn[]): Column[];
    makePredicates(...predicates: IPredicate[]): Predicate[];
    makeCondition(condition: ICondition): Condition;
    makeFields(...fields: IField[]): Field[];
    makePages(...pages: IPage[]): Page[];
    makeForm(formData: IFormProps): Form;
}
