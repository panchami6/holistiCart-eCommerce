import {useEffect} from "react";
import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";
import axios from "axios";
import {checkItemInCart} from "./Products";
import { useAuth } from "../Context/auth-context";
import "../styles.css";
import "./home.css";

export function Wishlist() {
  const { cartState } = useCart();
  const {cart} = cartState;
  const { wishlistState, wishlistDispatch} = useWishlist();
  const { wishlist } = wishlistState;
  const {userId} = useAuth();

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
  }, []);

  const moveToCart = async (item) => {
    try {
        console.log(item.quantity)
        removeFromWishlist(item)
        await axios.post(cartApi, { productId:item.productId, quantity:item.quantity, name:item.name, price:item.price, image:item.image, inStock: item.inStock, fastDelivery: item.fastDelivery });   
        wishlistDispatch({type:"ADD_TO_CART", payload:item.productId});
    } catch (error) {
        console.error(error);
    }
 }

  const removeFromWishlist = async (item) => {
  try{
   await axios.delete(`${wishlistApi}/${item.productId}`);
   wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item.productId})
  } catch(error){
   console.error(error);
  }
}

  return (
    <div className ="cart">
      <h2>Wishlist</h2>
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
            <button className = {item.inStock? "btn-wishlist-move-remove": "btn-disabled"}
              disabled={!item.inStock}
              onClick={() =>{
                 if(!checkItemInCart(cart, item.productId)) moveToCart(item)
               } 
               }
            >
              {checkItemInCart(cart, item.productId) ? "Item In cart" : "Move to Cart"} 
            </button>
            </div>
            <div className="cart-remove">
            <button className = "btn-wishlist-move-remove"
              onClick={() => removeFromWishlist(item)
              }
            >
              Remove
            </button>
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
