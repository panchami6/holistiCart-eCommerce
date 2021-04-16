import { StrictMode } from "react";
import ReactDOM from "react-dom";
// import "./server";
import App from "./App";
import { CartProvider } from "./cart-context";
// import { ThemeProvider } from "./theme-context";
import { WishListProvider } from "./wishlist-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CartProvider>
      <WishListProvider>
        {/* <ThemeProvider> */}
        <App />
        {/* </ThemeProvider> */}
      </WishListProvider>
    </CartProvider>
  </StrictMode>,
  rootElement
);
