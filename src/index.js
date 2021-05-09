import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Context/cart-context";
import { WishListProvider } from "./Context/wishlist-context";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <WishListProvider>
            <App />
        </WishListProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
  rootElement
);
