import { action, computed, decorate, observable } from "mobx";
import { ICondition } from "../../../models/condition";
import Predicate, { IPredicate } from "../../../models/condition.predicate";
import { Factory } from "../../../models/factory";
import Field from "../../../models/field";
import { GenericConstraint } from "../../../models/validation.constraints";
import FormStore from "../../../state/FormStore";

export interface IEditorStoreProps {
    field: Field
    formStore: FormStore;
    factory: Factory;
}

class EditorStore implements IEditorStoreProps {
    field: Field
    formStore: FormStore;
    factory: Factory;

    constructor(data: IEditorStoreProps) {
        this.initialize(data);
    }

    @action initialize(data: IEditorStoreProps) {
        this.field = data.field;
        this.formStore = data.formStore;
        this.factory = data.factory;
        return;
    }

    @computed get availableConditionSources() {
        let {formStore} = this;
        let fieldList = [];
        Object.keys(this.formStore.fieldMeta).forEach((id: string, index: number) => {
            fieldList.push({
                key: index,
                id: formStore.fieldMeta[id].id,
                label:formStore.fieldMeta[id].label,
                name:formStore.fieldMeta[id].name
            });
        });
        return fieldList;
    }

    @computed get availableExpressions() {
        let expressions = [];
        Predicate.PredicateConditions.forEach((p)=>{
            expressions.push({value:p, name:p});
        });
        return expressions;
    }

    @computed get availableOperators() {
        let operators = [];
        Predicate.PredicateOperators.forEach((o) => {
            operators.push({value:o, name:o});
        })
        return operators;
    }

    @computed get hasCondition() : boolean {
        return !!this.field.condition;
    }

    @computed get numPredicates() : number {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }

    @action addCondition = (c: ICondition) => {
        this.field.setCondition(this.factory.makeCondition(c));
    }

    @action removePredicate(uuid: string) {
        let {condition} = this.field;
        let index = condition.predicates.findIndex((p: Predicate)=> {
            return p.uuid == uuid;
        });

        if (index > -1) {
            condition.predicates.splice(index, 1);
        }

        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }

    @action addPredicate = (p: IPredicate) => {
        if (!this.field.condition) {
            let condition = this.factory.makeCondition({predicates: [p]});
            this.field.setCondition(condition);
            return;
        }
        this.field.condition.addPredicates(...this.factory.makePredicates(p));
    }

    @action setCondition = (c: ICondition) => {
        this.field.setCondition(c);
    }

    @action addValidationRule = (key: string, rule: GenericConstraint) => {
        this.field.validator.rule.addConstraint(key, rule);
    }

    @action updateValidationRule = (key: string, rule: GenericConstraint) => {
        this.field.validator.rule.updateConstraint(key, rule);
    }

    @action removeValidationRule = (key: string) => {
        this.field.validator.rule.removeConstraint(key);
    }

    @action setFieldProperty = (key: string, value: any) => {
        this.field[key] = value;
    }

    @action setComponentProperty = (key: string, value: any) => {
        this.field.componentProps[key] = value;
    }

    @action setField = (f: Field) => {
        this.field = f;
    }

    @computed get visible() {
        return !!this.field;
    }
}

decorate(EditorStore, {
    field: observable
})

export default EditorStore;