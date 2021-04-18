import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";

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
          <div class="products-wishlist"
            key={item.id}
          >
            <img src={item.image} width="100%" height="auto" alt={item.name} />
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
            <button
              onClick={() => {
                setItemsInCart((items) => [...items, item]);
                setItemsInWishList((prev) =>
                  prev.filter((items) => items.id !== item.id)
                );
              }}
            >
              Move to Cart
            </button>
            <button
              onClick={() =>
                setItemsInWishList((prev) =>
                  prev.filter((items) => items.id !== item.id)
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
