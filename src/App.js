import React, { useState } from "react";
import "./styles.css";

import { ProductListing } from "./Products";
import { Cart } from "./Cart";
import { Wishlist } from "./WishList";

export default function App() {
  const [route, setRoute] = useState("filteredData");

  return (
    <>
      <button onClick={() => setRoute("filteredData")}>Products</button>
      <button onClick={() => setRoute("cart")}>Cart</button>
      {/* <button onClick={() => setRoute("checkout")}>Checkout</button> */}
      <button onClick={() => setRoute("wishlist")}>Wishlist</button>

      {/* <CartHeader /> */}
      {/* {route === "checkout" && <Checkout />} */}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist setRoute={setRoute} />}
      {route === "filteredData" && <ProductListing setRoute={setRoute} />}
    </>
  );
}
