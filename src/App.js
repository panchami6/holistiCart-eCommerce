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
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Products" element={<ProductListing />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
