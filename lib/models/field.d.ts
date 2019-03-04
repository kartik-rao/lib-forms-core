import FormStore from "../state/FormStore";
import Condition, { ICondition } from "./condition";
import { IFieldProps, IComponentProps, IFieldStorage, ChoiceOption } from "./field.properties";
import Validator from "./validator";
import { IValidationRule } from "./validation";
declare class Field implements IFieldProps {
    readonly _type: string;
    id: string;
    name: string;
    uuid: string;
    type: string;
    label: string;
    value: any;
    inputType: string;
    helpText: string;
    placeholder: string;
    options: ChoiceOption[];
    valuePropName: string;
    condition: Condition;
    storage: IFieldStorage;
    store: FormStore;
    conditionState: boolean;
    validator: Validator;
    validation: IValidationRule;
    componentProps: IComponentProps;
    _dispose: any;
    mergeUpdate(data: Partial<IFieldProps>): void;
    initialize(data: IFieldProps, store: FormStore): void;
    readonly className: string;
    readonly isTouched: boolean;
    readonly isValidateable: boolean;
    readonly isValid: boolean;
    readonly isHidden: boolean;
    readonly isRequired: boolean;
    readonly currentValue: any;
    readonly isDisabled: boolean;
    setValue(value: any): void;
    setTouched(): void;
    setConditionState(value: boolean): void;
    setCondition(condition: ICondition): void;
    validate(): void;
    readonly serialize: string;
    constructor(data: IFieldProps, store: FormStore);
}
export default Field;
