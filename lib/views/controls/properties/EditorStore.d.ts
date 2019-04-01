import { ICondition } from "../../../models/condition";
import { IPredicate } from "../../../models/condition.predicate";
import { Factory } from "../../../models/factory";
import Field from "../../../models/field";
import { GenericConstraint } from "../../../models/validation.constraints";
import FormStore from "../../../store/FormStore";
export interface IEditorStoreProps {
    field: Field;
    formStore: FormStore;
    factory: Factory;
}
declare class EditorStore implements IEditorStoreProps {
    field: Field;
    formStore: FormStore;
    factory: Factory;
    constructor(data: IEditorStoreProps);
    initialize(data: IEditorStoreProps): void;
    readonly availableConditionSources: any[];
    readonly availableExpressions: any[];
    readonly availableOperators: any[];
    readonly hasCondition: boolean;
    readonly numPredicates: number;
    addCondition: (c: ICondition) => void;
    removePredicate(uuid: string): void;
    addPredicate: (p: IPredicate) => void;
    setCondition: (c: ICondition) => void;
    addValidationRule: (key: string, rule: GenericConstraint) => void;
    updateValidationRule: (key: string, rule: GenericConstraint) => void;
    removeValidationRule: (key: string) => void;
    setFieldProperty: (key: string, value: any) => void;
    setComponentProperty: (key: string, value: any) => void;
    setField: (f: Field) => void;
    readonly visible: boolean;
}
export default EditorStore;
