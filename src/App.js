import React, { useState } from "react";
import "./styles.css";
import { Routes, Route, Link } from 'react-router-dom';
import { ProductListing } from "./Products";
import { Cart } from "./Cart";
import { Wishlist } from "./WishList";
import NotFound from "./404";
import Home from "./Home";
import { NavigationBar } from "./Components/Navigation/navigationBar";
 
export default function App() {
  
  return (
    
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Products" element={<ProductListing />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
