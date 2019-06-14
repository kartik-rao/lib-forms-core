import {IFieldProps} from "../../models/field.properties";
import {IFieldRuntimeProps} from "../../models/field.properties";
import { FormStore } from "../../store/FormStore";

export interface IViewProps {
    field: IFieldProps&IFieldRuntimeProps;
    onChange?:(e: any) => void;
    onBlur?: (e: any) => void;
    store?: FormStore;
}