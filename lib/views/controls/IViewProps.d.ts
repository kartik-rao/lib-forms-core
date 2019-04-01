import { IFieldProps } from "../../models/field.properties";
import FormStore from "../../store/FormStore";
export interface IViewProps {
    field: IFieldProps;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    store?: FormStore;
}
