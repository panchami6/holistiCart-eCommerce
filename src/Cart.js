import { useCart } from "./cart-context";
// import { useWishlist } from "./wishlist-context";
// import { useState } from "react";

const getAmount = (acc, items) => {
  return acc + items.price * items.quantity;
};

export function Cart() {
  const { itemsInCart, setItemsInCart } = useCart();
  // const { setItemsInWishList } = useWishlist();
  // const [quantity, setQuantity] = useState(1);
  console.log(itemsInCart);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Cart</h2>
      <h3> Total: {itemsInCart.reduce(getAmount, 0)}</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {itemsInCart.map((item) => (
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
                setItemsInCart((prev) =>
                  prev.map((items) =>
                    items.id === item.id
                      ? { ...items, quantity: items.quantity + 1 }
                      : items
                  )
                );
              }}
            >
              +
            </button>
            {item.quantity}
            <button
              disabled={item.quantity < 2}
              onClick={() => {
                setItemsInCart((prev) =>
                  prev.map((items) =>
                    items.id === item.id
                      ? { ...items, quantity: items.quantity - 1 }
                      : items
                  )
                );
              }}
            >
              -
            </button>
            <button
              onClick={() =>
                setItemsInCart((prev) =>
                  prev.filter((items) => items.id !== item.id)
                )
              }
            >
              Remove
            </button>
            <button>Checkout</button>
          </div>
        ))}
      </div>
    </div>
  );
}
