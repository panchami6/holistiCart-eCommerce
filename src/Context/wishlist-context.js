import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const WishListContext = createContext();

export function WishListProvider({ children }) {

  const [itemsInWishList, setItemsInWishList] = useState([]);
  return (
    <WishListContext.Provider value={{ itemsInWishList, setItemsInWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishListContext);
}
