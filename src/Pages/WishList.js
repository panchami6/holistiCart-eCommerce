import {useEffect, useState} from "react";
import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";
import axios from "axios";
import {checkItemInCart} from "./Products";
import { useAuth } from "../Context/auth-context";
import "../styles.css";
import "./home.css";
import { Link } from "react-router-dom";

export function Wishlist() {
  const { cartState } = useCart();
  const {cart} = cartState;
  const { wishlistState, wishlistDispatch} = useWishlist();
  const { wishlist } = wishlistState;
  const {userId} = useAuth();
  const [loader, setLoader] = useState(false)
  const [loaderId, setLoaderId] = useState("");
  const [loaderIdRemove, setLoaderIdRemove] = useState("");

  const cartApi = `https://holisticart.panchami6.repl.co/cart/${userId}`;
  const wishlistApi = `https://holisticart.panchami6.repl.co/wishlist/${userId}`;

  useEffect(() => {
    (async function () {
      try{
      const response = await axios.get(wishlistApi);
      const wishlistData = response.data.wishlist.products;
      wishlistDispatch({type: "WISHLIST_DATA", payload:wishlistData})
    }catch(error){
      console.log(error)
    }
    })();
  }, [loader]);

  const moveToCart = async (item) => {
    try {
        setLoader(true)
        removeFromWishlist(item)
        await axios.post(cartApi, { productId:item.productId, quantity:item.quantity, name:item.name, price:item.price, image:item.image, inStock: item.inStock, fastDelivery: item.fastDelivery }); 
        setLoader(false)  
        wishlistDispatch({type:"ADD_TO_CART", payload:item.productId});
    } catch (error) {
        console.error(error);
    }
 }

  const removeFromWishlist = async (item) => {
  try{
    setLoader(true)
   await axios.delete(`${wishlistApi}/${item.productId}`);
   setLoader(false)
   wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item.productId})
  } catch(error){
   console.error(error);
  }
}

  return (
    <div className = "cart-main">
    <h2>Wishlist</h2>
    <div className ="cart">
     {wishlist.length > 0 ? (
      <div>
        {wishlist.map((item) => (
          <div className="products-cart"
            key={item._id}
          >
            <div className="cart-image">
            <img className="img-cart" src={item.image} width="100%" height="auto" alt={item.name} />
            </div>
            <div className="cart-product-details">
            <h3> {item.name} </h3>
            <strong>Rs. {item.price}</strong>
            {item.inStock && <div> In Stock </div>}
            {!item.inStock && <div> Out of Stock </div>}
            <div>{item.level}</div>
            {item.fastDelivery ? (
              <div> Fast Delivery </div>
            ) : (
              <div> 3 days minimum </div>
            )}
            <div className="wishlist-buttons">
            <div className="move-to-cart">
            <button className = {item.inStock? "btn-wishlist-move": "btn-disabled-wishlist"}
              disabled={!item.inStock}
              onClick={() =>{
                 if(!checkItemInCart(cart, item.productId)) {
                   setLoaderId(item._id)
                   moveToCart(item)
                 }
               } 
               }
            >
              {(loader && loaderId === item._id) ? "Moving" : (checkItemInCart(cart, item.productId) ? "Item In cart" : "Move to Cart")} 
            </button>
            </div>
            <div className="cart-remove">
            <button className = "btn-wishlist-remove"
              onClick={() => {
                setLoaderIdRemove(item._id)
                removeFromWishlist(item)
              } 
              }
            >
              {(loader && loaderIdRemove === item._id) ? "Removing" : "Remove"}
            </button>
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
     ) : (
      <div className = "empty-cart">
        <div>No Products in Wishlist.</div>
        <Link to ="/products">
        <button className = "empty-cart-btn">Shop now</button></Link>
      </div>
     )}
      
    </div>
    </div>
  );
}
