import * as React from "react";
import { createFormStore } from "./FormStore";
import { useLocalStore } from "mobx-react";
import { Factory } from '../models/factory';
export const formStoreContext = React.createContext(null);
export const FormStoreProvider = (props) => {
    const store = useLocalStore(createFormStore);
    let factory = new Factory(store);
    store.setForm(factory.makeForm(props.initialState));
    return (React.createElement(formStoreContext.Provider, { value: store }, props.children));
};
