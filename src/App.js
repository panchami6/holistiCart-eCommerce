import React from "react";
import "./styles.css";
import { Routes, Route} from 'react-router-dom';
import { ProductListing } from "./Pages/Products";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/WishList";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";
import { NavigationBar } from "./Components/Navigation/navigationBar";
 
export default function App() {
  
  return (
    
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishList" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
