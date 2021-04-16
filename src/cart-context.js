import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  return (
    <CartContext.Provider value={{ itemsInCart, setItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
}

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(cartWishlistReducer, { itemsInCart });

//   return (
//     <CartContext.Provider
//       value={{
//         itemsInCart: state.itemsInCart,
//         counter: state.counter,
//         dispatch
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

export function useCart() {
  return useContext(CartContext);
}

// export const CartProvider = ({ children }) => {
//   const [{ itemsIncart, itemsInWishList }, dispatch] = useReducer(
//     cartWishlistReducer,
//     itemsInCartWishList
//   );
//   return (
//     <CartContext.Provider
//       value={{
//         itemsIncart,
//         itemsInWishList,
//         dataDispatch: dispatch
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export function useCart() {
//   useContext(CartContext);
// }
