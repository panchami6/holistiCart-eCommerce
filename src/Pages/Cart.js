import { useCart } from "../Context/cart-context";
import "../styles.css";
import { useAuth } from "../Context/auth-context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const getAmount = (acc, items) => {
  return acc + parseInt(items.price,10) * parseInt(items.quantity,10);
};

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    resolve(true)
  }
  script.onerror = () => {
    resolve(false)
  }
  document.body.appendChild(script)
  })
  
  
}

export function Cart() {
  const { cartState, cartDispatch } = useCart();
  const { cart } = cartState;
  const {userId} = useAuth();
  const [loader, setLoader] = useState(false);
  const [loaderId, setLoaderId] = useState("")
  const [loaderIdQnt, setLoaderIdQnt] = useState("")
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
  }, [loader])

  const deleteCartItem = async (item) => {
    try {
        setLoader(true)
        await axios.delete(`${cartApi}/${item.productId}`);
        cartDispatch({type:"DELETE_FROM_CART", payload: item.productId});
        setLoader(false)
        setLoaderId("")
    } catch (error) {
        console.log(error);
    }
}
 

const increaseQty = async (item) => {
    try {
        setLoader(true)
        await axios.post(cartApi, { productId: item.productId, quantity: item.quantity + 1 });
        setLoader(false)
        setLoaderIdQnt("")
        cartDispatch({type:"INCREASE_QUANTITY", payload:{productId: item.productId, quantity: item.quantity}})
    } catch (error) {
        console.log(error);
    }
}

const decreaseQty = async (item) => {
    try {
        setLoader(true)
        await axios.post(cartApi, { productId: item.productId, quantity: item.quantity - 1 });
        setLoader(false)
        setLoaderIdQnt("")
        cartDispatch({type:"DECREASE_QUANTITY", payload:{productId: item.productId, quantity: item.quantity}})
    } catch (error) {
        console.log(error);
    }
}

const displayRazorpay = async () => {

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

  if(!res) {
    alert('Razorpay SDK failed to load. Are you online?')
    return
  }

  const response = await axios.post("https://holistiCart.panchami6.repl.co/razorpay", {amount: cart.reduce(getAmount, 0)})
  const razorpayData = response.data
  console.log(razorpayData)


  const options = {
    "key": "rzp_test_O0NRuVXCtyxURD", 
    "amount": razorpayData.amount,
    "currency": razorpayData.currency,
    "order_id": razorpayData.id, 
};
const paymentObject = new Razorpay(options);
paymentObject.open()
}

  return (
    <div className = "cart-main">
     <h2>My Cart</h2> 
    <div className="cart">
    {cart.length > 0 ? (
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
            <div className="cart-quantity">
            <button className="cart-quantiy-btn"
              onClick={() => {
                setLoaderIdQnt(item._id)
                increaseQty(item)}
              }
            >
              +
            </button>
            {(loader && loaderIdQnt === item._id) ? <i className="fa fa-spinner fa-spin"></i> : item.quantity}
            <button className="cart-quantiy-btn"
              disabled={item.quantity < 2}
              onClick={() => {
                setLoaderIdQnt(item._id)
                decreaseQty(item)}
              }
            >
            -
            </button>
            </div>
            <div className="cart-remove">
            <button className="cart-btn-remove"
              onClick={() => {
                setLoaderId(item._id)
                deleteCartItem(item)}
              }
            >
              {(loader && loaderId === item._id) ? "Removing" : "Remove"}
            </button>
            </div>
            </div>
        
          </div>
        ) )} 
        </div>
    ) : (
      <div className = "empty-cart">
        <div>No Products in Cart.</div>
        <Link to ="/products">
        <button className = "empty-cart-btn">Shop now</button></Link>
      </div>
    ) }
    
    {cart.length > 0 && (
      <div className = "checkout">
          <div className = "checkout-header">Price Details</div>
          <div className = "checkout-price">
          <p>Price <span>({cart.length} Items)</span></p>
          <p>₹{cart.reduce(getAmount, 0)}</p>
          </div>
          <div className = "checkout-total">
            <strong> Total Amount </strong>
            <strong>₹{cart.reduce(getAmount, 0)}</strong>
          </div>
          
            <div>{cart.length > 0 ? <button className = "checkout-btn" onClick = {displayRazorpay}>checkout</button> : <button className = "checkout-btn">Shop Now</button>}
            </div>
        </div>
    )}
        
        </div>
        </div>
  )}
      
