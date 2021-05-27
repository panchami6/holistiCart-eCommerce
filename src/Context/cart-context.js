import { createContext, useContext, useReducer} from "react";
import { cartReducer } from "../Reducer/cart-reducer";
export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartState, cartDispatch] = useReducer(cartReducer, {cart: []})
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


