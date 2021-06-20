import { useCart } from "../Context/cart-context";
import "../styles.css";
import { useAuth } from "../Context/auth-context";
import axios from "axios";
import React, { useEffect } from "react";

const getAmount = (acc, items) => {
  return acc + parseInt(items.price,10) * parseInt(items.quantity,10);
};

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { cart } = cartState;
  const {userId} = useAuth();
  const cartApi = `https://holisticart.panchami6.repl.co/cart/${userId}`;

  useEffect(() => {
    (async function () {
      try{
      const response = await axios.get(cartApi);
      const cartData = response.data.cart.products;
      cartDispatch({type:"CART_DATA", payload: cartData});
    }catch(error){
      console.log(error)
    }
    })();
  }, [])

  const deleteCartItem = async (item) => {
    try {
        await axios.delete(`${cartApi}/${item.productId}`);
        cartDispatch({type:"DELETE_FROM_CART", payload: item.productId});
    } catch (error) {
        console.log(error);
    }
}
 

const increaseQty = async (item) => {
    try {
        await axios.post(cartApi, { productId: item.productId, quantity: item.quantity + 1 });
        cartDispatch({type:"INCREASE_QUANTITY", payload:{productId, quantity}})
    } catch (error) {
        console.log(error);
    }
}

const decreaseQty = async (item) => {
    try {
        await axios.post(cartApi, { productId: item.productId, quantity: item.quantity - 1 });
        cartDispatch({type:"DECREASE_QUANTITY", payload:{productId, quantity}})
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="cart">
      <h2>My Cart</h2> 
      
      <h3> Total: {cart.reduce(getAmount, 0)}</h3>
      <div>
      {cart.map((item) => (
         <div className="products-cart"
            key={item._id}
          >
            <div className="cart-image">
              <img className="img-cart" src={item.image} width="100%" height="auto" alt={item.name} />
            </div> 
            <div className="cart-product-details">
            <h3> {item.name} </h3>
            <strong>Rs. {item.price}</strong>
            {item.inStock && <p> In Stock </p>}
            {!item.inStock && <p> Out of Stock </p>}
            <p>{item.level}</p>
            {item.fastDelivery ? (
              <p> Fast Delivery </p>
            ) : (
              <p> 3 days minimum </p>
            )}

            <div className="cart-quantity">
            <button className="cart-quantiy-btn"
              onClick={() => increaseQty(item)
              }
            >
              +
            </button>
            {item.quantity}
            <button className="cart-quantiy-btn"
              disabled={item.quantity < 2}
              onClick={() => decreaseQty(item)
              }
            >
              -
            </button>
            </div>
            <div className="cart-remove">
            <button className="cart-btn-remove"
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
      
