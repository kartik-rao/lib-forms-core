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
export declare class Factory {
    store: FormStore;
    constructor(store: FormStore);
    setUUID<T>(item: T): void;
    makePredicates(...predicates: IPredicate[]): Predicate[];
    makeCondition(condition: ICondition): Condition;
    makeFields(...fields: IFieldProps[]): Field[];
    makeColumns(...columns: IColumn[]): Column[];
    makeSections(...sections: ISection[]): Section[];
    makePages(...pages: IPage[]): Page[];
    makeForm(formData: IFormProps): Form;
}
