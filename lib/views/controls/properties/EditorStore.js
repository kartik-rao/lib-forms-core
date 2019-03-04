var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, decorate, observable } from "mobx";
import Predicate from "../../../models/condition.predicate";
class EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.field.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.field.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.field.setCondition(condition);
                return;
            }
            this.field.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.field.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.field.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.field.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.field.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.field[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setField = (f) => {
            this.field = f;
        };
        this.initialize(data);
    }
    initialize(data) {
        this.field = data.field;
        this.formStore = data.formStore;
        this.factory = data.factory;
        return;
    }
    get availableConditionSources() {
        let { formStore } = this;
        let fieldList = [];
        Object.keys(this.formStore.fieldMeta).forEach((id, index) => {
            fieldList.push({
                key: index,
                id: formStore.fieldMeta[id].id,
                label: formStore.fieldMeta[id].label,
                name: formStore.fieldMeta[id].name
            });
        });
        return fieldList;
    }
    get availableExpressions() {
        let expressions = [];
        Predicate.PredicateConditions.forEach((p) => {
            expressions.push({ value: p, name: p });
        });
        return expressions;
    }
    get availableOperators() {
        let operators = [];
        Predicate.PredicateOperators.forEach((o) => {
            operators.push({ value: o, name: o });
        });
        return operators;
    }
    get hasCondition() {
        return !!this.field.condition;
    }
    get numPredicates() {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.field;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }
    get visible() {
        return !!this.field;
    }
}
__decorate([
    action
], EditorStore.prototype, "initialize", null);
__decorate([
    computed
], EditorStore.prototype, "availableConditionSources", null);
__decorate([
    computed
], EditorStore.prototype, "availableExpressions", null);
__decorate([
    computed
], EditorStore.prototype, "availableOperators", null);
__decorate([
    computed
], EditorStore.prototype, "hasCondition", null);
__decorate([
    computed
], EditorStore.prototype, "numPredicates", null);
__decorate([
    action
], EditorStore.prototype, "addCondition", void 0);
__decorate([
    action
], EditorStore.prototype, "removePredicate", null);
__decorate([
    action
], EditorStore.prototype, "addPredicate", void 0);
__decorate([
    action
], EditorStore.prototype, "setCondition", void 0);
__decorate([
    action
], EditorStore.prototype, "addValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "updateValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "removeValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "setFieldProperty", void 0);
__decorate([
    action
], EditorStore.prototype, "setComponentProperty", void 0);
__decorate([
    action
], EditorStore.prototype, "setField", void 0);
__decorate([
    computed
], EditorStore.prototype, "visible", null);
decorate(EditorStore, {
    field: observable
});
export default EditorStore;
