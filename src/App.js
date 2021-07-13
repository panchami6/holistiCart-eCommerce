import React from "react";
import "./styles.css";
import { Routes, Route} from 'react-router-dom';
import { ProductListing } from "./Pages/Products";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/WishList";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import {PrivateRoute} from "./Components/PrivateRoute";
import { NavigationBar } from "./Components/Navigation/navigationBar";
 
export default function App() {

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishList" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
