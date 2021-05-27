import { createContext, useContext, useState} from "react";
import { ProductsReducer } from "../Reducer/product-reducer";

export const ProductsContext = createContext();

const initialState = {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: null
}

export function ProductsProvider({ children }) {
 const [state, dispatch] = useReducer(ProductsReducer, initialState)
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}


