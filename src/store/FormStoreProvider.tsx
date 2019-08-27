import * as React from "react";
import {FormStoreType, createFormStore} from "./FormStore";
import { useLocalStore } from "mobx-react";
export const formStoreContext = React.createContext<FormStoreType | null>(null);

export const FormStoreProvider: React.FC = ({children}) => {
    const store = useLocalStore(createFormStore);
    return (
      <formStoreContext.Provider value={store}>
        {children}
      </formStoreContext.Provider>
    )
}