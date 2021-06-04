import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Context/cart-context";
import { WishlistProvider } from "./Context/wishlist-context";
import { AuthProvider }  from "./Context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
