import {IFieldProps} from "../../models/field.properties";
import FormStore from "../../state/FormStore";

export interface IViewProps {
    field: IFieldProps;
    onChange?:(e: any) => void;
    onBlur?: (e: any) => void;
    store?: FormStore;
}