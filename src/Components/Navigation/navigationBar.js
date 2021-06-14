import { useCart } from "../../Context/cart-context";
import { useWishlist } from "../../Context/wishlist-context";
import { Link } from "react-router-dom";
import "./nav.css";
import {useAuth} from "../../Context/auth-context";

export function NavigationBar() {
const {cartState} = useCart();
const { cart } = cartState;
const {wishlistState} = useWishlist();
const { wishlist } = wishlistState;
const { isUserLogin, logoutUser } = useAuth();

    return(
    <nav className="navigation">
        <div className="nav-Header" >
        <Link className="nav-link nav-header" to="/"><span><i class="fas fa-spa"></i></span> HolistiCart</Link>
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/products"> <i class="fas fa-store"></i> </Link> 
          <Link className="nav-link" to="/cart"><i class="fas fa-shopping-cart"></i><span className="cart-wishlist-quantity">{cart.length}</span></Link> 
          <Link className="nav-link" to="/wishList"><i class="fas fa-heart"></i><span className="cart-wishlist-quantity">{wishlist.length}</span></Link>
          {isUserLogin && <button className="nav-link" onClick={logoutUser}><i class="fas fa-sign-out-alt"></i></button>}
        </div>
      </nav>
    )
}