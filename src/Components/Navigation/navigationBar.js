import {useState} from "react";
import { useCart } from "../../cart-context";
import { useWishlist } from "../../wishlist-context";
import { Link } from "react-router-dom";
import "./nav.css";

export function NavigationBar() {
const {itemsInCart} = useCart();
const {itemsInWishList} = useWishlist();
    return(
    <nav className="navigation">
        <div className="nav-Header" >
        <Link className="nav-link nav-header" to="/"><span><i class="fas fa-spa"></i></span> HolistiCart</Link>
        </div>
        <div className="nav-links">
        <Link className="nav-link" to="/Products"> <i class="fas fa-store"></i> </Link> 
        <Link className="nav-link" to="/Cart"><i class="fas fa-shopping-cart"></i><span className="cart-wishlist-quantity">{itemsInCart.length}</span></Link> 
        <Link className="nav-link" to="/WishList"><i class="fas fa-heart"></i><span className="cart-wishlist-quantity">{itemsInWishList.length}</span></Link>
        </div>
    </nav>
    )
}