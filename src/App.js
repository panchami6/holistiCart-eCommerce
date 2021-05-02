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
      {/* <nav className="navigation">
        <div className="nav-Header" >
        <i class="fas fa-spa"></i>
        <Link className="nav-link nav-header" to="/"> HolistiCart</Link>
        </div>
        <div className="nav-links">
        {/* <Link className="nav-link" to="/"> Home </Link> || */}
        {/* <Link className="nav-link" to="/Products"> Products </Link> 
        <Link className="nav-link" to="/Cart"><i class="fas fa-shopping-cart"></i></Link> 
        <Link className="nav-link" to="/WishList"><i class="fas fa-heart"></i></Link>
        </div> */}
      {/* </nav> */}
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
