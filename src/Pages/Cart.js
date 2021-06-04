import { useCart } from "../Context/cart-context";
import "../styles.css";
import {useEffect} from "react"
import axios from "axios";

const getAmount = (acc, items) => {
  return acc + parseInt(items.price,10) * parseInt(items.quantity,10);
};

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { cart } = cartState;
  const cartApi = "https://holisticart.panchami6.repl.co/cart";

  const deleteCartItem = async (item) => {
    try {
        await axios.delete(`${cartApi}/${item._id}`);
        cartDispatch({type:"DELETE_FROM_CART", payload: item._id});
    } catch (error) {
        console.log(error);
    }
}


const increaseQty = async (item) => {
    try {
        await axios.post(`${cartApi}/${item._id}`, { quantity: item.quantity + 1 });
        cartDispatch({type:"INCREASE_QUANTITY", payload:item._id})
    } catch (error) {
        console.log(error);
    }
}

const decreaseQty = async (item) => {
    try {
        await axios.post(`${cartApi}/${item._id}`, { quantity: item.quantity - 1 });
        cartDispatch({type:"DECREASE_QUANTITY", payload:item._id})
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div class="cart">
      <h2>Cart</h2> 
      
      <h3> Total: {cart.reduce(getAmount, 0)}</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
      {
        cart.map((item) => 
        (
        
         <div class="products-cart"
            key={item._id}
          >
            <div class="cart-image">
              <img class="img-cart" src={item.image} width="100%" height="auto" alt={item.name} />
            </div> 
            <div class="cart-product-details">
            <h3> {item.name} </h3>
            <p>Rs. {item.price}</p>
            {item.inStock && <p> In Stock </p>}
            {!item.inStock && <p> Out of Stock </p>}
            <p>{item.level}</p>
            {item.fastDelivery ? (
              <p> Fast Delivery </p>
            ) : (
              <p> 3 days minimum </p>
            )}

            <div class="cart-quantity">
            <button class="cart-quantiy-btn"
              onClick={() => increaseQty(item)
              }
            >
              +
            </button>
            {item.quantity}
            <button class="cart-quantiy-btn"
              disabled={item.quantity < 2}
              onClick={() => decreaseQty(item)
              }
            >
              -
            </button>
            </div>
            <div className="cart-remove">
            <button class="cart-btn-remove"
              onClick={() => deleteCartItem(item)
              }
            >
              Remove
            </button>
            </div>
            </div>
        
          </div>
        ) )} 
        </div>
        </div>
  )}
      
