import { createContext, useContext, useReducer } from "react";
import { wishlistReducer } from "../Reducer/wishlist-reducer"

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {

   const [ wishlistState, wishlistDispatch ] = useReducer(wishlistReducer, {wishlist: []})
  return (
    <WishlistContext.Provider value={{ wishlistState, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
