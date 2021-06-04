import React, { useEffect, useState } from "react";
import "./styles.css";
import { Routes, Route} from 'react-router-dom';
import { ProductListing } from "./Pages/Products";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/WishList";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {PrivateRoute} from "./Components/PrivateRoute";
import { NavigationBar } from "./Components/Navigation/navigationBar";
import axios from "axios";
import { useCart } from "./Context/cart-context";
import { useWishlist } from "./Context/wishlist-context";
 
export default function App() {
  const {cartDispatch} = useCart();
  const {wishlistDispatch} = useWishlist();
  const cartApi = "https://holisticart.panchami6.repl.co/cart";
  const wishlistApi = "https://holisticart.panchami6.repl.co/wishlist";

  useEffect(() => {
    (async function () {
      const response = await axios.get(cartApi);
      const cartData = response.data.cart;
      cartDispatch({type:"CART_DATA", payload: cartData});
    })();
  }, [cartDispatch]);

  useEffect(() => {
    (async function () {
      const response = await axios.get(wishlistApi);
      const wishlistData = response.data.wishlist;
      wishlistDispatch({type: "WISHLIST_DATA", payload:wishlistData})
    })();
  }, [wishlistDispatch]);

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishList" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
