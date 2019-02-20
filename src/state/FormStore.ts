import {action, decorate, observable, computed} from "mobx";
import Page from "../models/page";

class FormStore {
    form: Page[];

    errors: any;
    values: any;
    touched: any;
    validationSchema: any;
    currentPage: number;

    @computed get isValid() : boolean {
        return false;
    }

    @action setFieldValue(id: string, value: any) {
        this.values[id] = value;
    }

    @action setFieldTouched(id: string) {
        this.touched[id] = true;
    }

    @action setFieldError(id: string, error: any) {
        this.errors[id] = error;
    }

    @action initialize(data: any) {
        this.values = data.values;
    }

    constructor(data: any) {
        this.initialize(data);
    }

}

decorate(FormStore, {
    errors: observable,
    values: observable,
    touched: observable,
    validationSchema: observable,
    currentPage: observable
})

export default FormStore;