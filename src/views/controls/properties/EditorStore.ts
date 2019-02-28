import {action, decorate, observable, computed, set, toJS} from "mobx";
import Field from "../../../models/field";
import { ICondition } from "../../../models/condition";
import FormStore from "../../../state/FormStore";
import Predicate from "../../../models/condition.predicate";

class EditorStore {
    field: Field
    formStore: FormStore;

    constructor(data: any) {
        this.initialize(data);
    }

    @action initialize(data: any) {
        this.field = data.field;
        this.formStore = data.formStore;
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

    @action updateCondition = (c: ICondition) => {
        this.field.setCondition(c);
    }

    @action addValidationRule = (rule: any) => {
        this.field.validationRules = {...this.field.validationRules, ...rule};
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