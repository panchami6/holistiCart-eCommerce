import { useCart } from "../../Context/cart-context";
import { useWishlist } from "../../Context/wishlist-context";
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
        <Link className="nav-link" to="/products"> <i class="fas fa-store"></i> </Link> 
        <Link className="nav-link" to="/cart"><i class="fas fa-shopping-cart"></i><span className="cart-wishlist-quantity">{itemsInCart.length}</span></Link> 
        <Link className="nav-link" to="/wishList"><i class="fas fa-heart"></i><span className="cart-wishlist-quantity">{itemsInWishList.length}</span></Link>
        </div>
    </nav>
    )
}