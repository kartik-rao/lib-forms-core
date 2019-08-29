import { FormStoreType } from "../store/FormStore";
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
    static ensureIds<T>(item: T): void;
    static makePredicates(store: FormStoreType, ...predicates: IPredicate[]): Predicate[];
    static makeCondition(store: FormStoreType, condition: ICondition): Condition;
    static makeFields(store: FormStoreType, ...fields: IFieldProps[]): Field[];
    static makeColumns(store: FormStoreType, ...columns: IColumn[]): Column[];
    static makeSections(store: FormStoreType, ...sections: ISection[]): Section[];
    static makePages(store: FormStoreType, ...pages: IPage[]): Page[];
    static makeForm(store: FormStoreType, formData: IFormProps): Form;
}
