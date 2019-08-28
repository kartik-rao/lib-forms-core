import * as React from "react";
import {FormStoreType, createFormStore} from "./FormStore";
import { useLocalStore } from "mobx-react";
import { IFormProps } from '../models/form.properties';
import { Factory } from '../models/factory';
export const formStoreContext = React.createContext<FormStoreType | null>(null);

export interface FormStoreProviderProps {
  initialState?: IFormProps;
  formStore?: FormStoreType;
}

export const FormStoreProvider: React.FC<FormStoreProviderProps> = (props) => {
    let store;
    if (props.formStore) {
        store = props.formStore;
    } else if (props.initialState) {
        store = useLocalStore(createFormStore);
        let factory = new Factory(store);
        store.setForm(factory.makeForm(props.initialState));
    } else {
      throw new Error("FormStoreProvider - Pass initialState or formStore")
    }
    return (
      <formStoreContext.Provider value={store}>
        {props.children}
      </formStoreContext.Provider>
    )
}