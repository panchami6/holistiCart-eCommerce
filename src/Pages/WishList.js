import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";

export function Wishlist() {
  const { setItemsInCart } = useCart();
  const { itemsInWishList, setItemsInWishList } = useWishlist();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Wishlist</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {itemsInWishList.map((item) => (
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
            <button disabled={!item.inStock}
              onClick={() => {
                setItemsInCart((items) => [...items, item]);
                setItemsInWishList((prev) =>
                  prev.filter((items) => items._id !== item._id)
                );
              }}
            >
              Move to Cart
            </button>
            </div>
            <div className="cart-remove">
            <button className="cart-btn-remove"
              onClick={() =>
                setItemsInWishList((prev) =>
                  prev.filter((items) => items._id !== item._id)
                )
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
