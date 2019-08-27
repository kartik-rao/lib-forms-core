import * as React from "react";
import {FormStoreType, createFormStore} from "./FormStore";
import { useLocalStore } from "mobx-react";
import { IFormProps } from '../models/form.properties';
import { Factory } from '../models/factory';
export const formStoreContext = React.createContext<FormStoreType | null>(null);

export const FormStoreProvider: React.FC<{initialState: IFormProps}> = (props) => {
    const store = useLocalStore(createFormStore);
    let factory = new Factory(store);
    store.setForm(factory.makeForm(props.initialState));
    return (
      <formStoreContext.Provider value={store}>
        {props.children}
      </formStoreContext.Provider>
    )
}