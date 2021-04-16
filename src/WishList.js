import { useCart } from "./cart-context";
// import { useTheme } from "./theme-context";
import { useWishlist } from "./wishlist-context";

export function Wishlist() {
  const { setItemsInCart } = useCart();
  const { itemsInWishList, setItemsInWishList } = useWishlist();
  // const { colorTheme } = useTheme();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Wishlist</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {itemsInWishList.map((item) => (
          // <ShowItem item={item} />
          <div
            key={item.id}
            style={{
              textAlign: "center",
              border: "1px solid #4B5563",
              borderRadius: "0 0 0.5rem 0.5rem",
              margin: "1rem",
              maxWidth: "40%",
              padding: "0 0 1rem"
            }}
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
