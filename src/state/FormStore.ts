import {action, decorate, observable, computed, set} from "mobx";

class FormStore {
    errors: any;
    values: any;
    touched: any;
    currentPage: number;
    debug : boolean;

    @computed get isValid() : boolean {
        return false;
    }

    @action setFieldValue(id: string, value: any) {
        set(this.values, id, value);
    }

    @action setFieldTouched(id: string) {
        set(this.touched, id, true);
    }

    @action setFieldError(id: string, error: any) {
        set(this.errors, id, error);
    }

    @action initialize(data: any) {
        this.values = data.values;
        this.errors = {};
        this.touched = {};
        this.currentPage = 0;
        this.debug = !!data.debug ? data.debug : false;
        return;
    }

    constructor(data: any) {
        this.initialize(data);
    }

}

decorate(FormStore, {
    errors: observable,
    values: observable,
    touched: observable,
    currentPage: observable
})

export default FormStore;