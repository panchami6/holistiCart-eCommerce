import React, { useState } from "react";
import "./styles.css";
import { Routes, Route, Link } from 'react-router-dom';
import { ProductListing } from "./Products";
import { Cart } from "./Cart";
import { Wishlist } from "./WishList";
import NotFound from "./404";
import Home from "./Home";

export default function App() {
  
  return (
    
    <div className="App">
      <nav className="navigation">
  
        <Link className="nav-link" to="/"> Home </Link> ||
        <Link className="nav-link" to="/Products"> Products </Link> ||
        <Link className="nav-link" to="/Cart">Cart </Link> ||
        <Link className="nav-link" to="/WishList">WishList </Link>
      </nav>
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
