import * as React from "react";
import { createFormStore } from "./FormStore";
import { useLocalStore } from "mobx-react";
import { Factory } from '../models/factory';
export const formStoreContext = React.createContext(null);
export const FormStoreProvider = (props) => {
    let store;
    if (props.formStore) {
        store = props.formStore;
    }
    else if (props.initialState) {
        store = useLocalStore(createFormStore);
        let factory = new Factory(store);
        store.setForm(factory.makeForm(props.initialState));
    }
    else {
        throw new Error("FormStoreProvider - Pass initialState or formStore");
    }
    return (React.createElement(formStoreContext.Provider, { value: store }, props.children));
};
