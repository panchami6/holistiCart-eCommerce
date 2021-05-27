import {useEffect} from "react";
import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";
import axios from "axios";
import {checkItemInCart} from "./Products";
import "../styles.css";
import "./home.css";


export function Wishlist() {
  const { cartState } = useCart();
  const {cart} = cartState;
  const { wishlistState, wishlistDispatch} = useWishlist();
  const { wishlist } = wishlistState;

  const cartApi = "https://holisticart.panchami6.repl.co/cart";
  const wishlistApi = "https://holisticart.panchami6.repl.co/wishlist";

  useEffect(() => {
    (async function () {
      const response = await axios.get(wishlistApi);
      const wishlistData = response.data.wishlist;
      wishlistDispatch({type: "WISHLIST_DATA", payload:wishlistData})
    })();
  }, []);

  const moveToCart = async (item) => {
    try {
        removeFromWishlist(item)
        await axios.post(cartApi, { _id:item._id});   
        wishlistDispatch({type:"MOVE_TO_CART", payload:item._id});
        wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item._id});
    } catch (error) {
        console.error(error);
    }
 }

  const removeFromWishlist = async (item) => {
  try{
   await axios.delete(`${wishlistApi}/${item._id}`);
   wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item._id})
  } catch(error){
   console.error(error);
  }
}

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{marginTop: "1rem"}}>Wishlist</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {wishlist.map((item) => (
          <div class="products-cart"
            key={item._id}
          >
            <div class="cart-image">
            <img class="img-cart" src={item.image} width="100%" height="auto" alt={item.name} />
            </div>
            <div class="cart-product-details">
            <h3> {item.name} </h3>
            <div>Rs. {item.price}</div>
            {item.inStock && <div> In Stock </div>}
            {!item.inStock && <div> Out of Stock </div>}
            <div>{item.level}</div>
            {item.fastDelivery ? (
              <div> Fast Delivery </div>
            ) : (
              <div> 3 days minimum </div>
            )}
            <div class="wishlist-buttons">
            <div class="move-to-cart">
            <button className = {item.inStock? "btn-wishlist-move-remove": "btn-disabled"}
              disabled={!item.inStock}
              onClick={() =>{
                 if(!checkItemInCart(cart, item._id)) moveToCart(item)
               } 
               }
            >
              {checkItemInCart(cart, item._id) ? "Item In cart" : "Move to Cart"} 
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
