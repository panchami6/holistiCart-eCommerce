import { useCart } from "./cart-context";
import "./styles.css";

const getAmount = (acc, items) => {
  return acc + items.price * items.quantity;
};

export function Cart() {
  const { itemsInCart, setItemsInCart } = useCart();
  console.log(itemsInCart);
  return (
    <div class="cart">
      <h2>Cart</h2>
      <h3> Total: {itemsInCart.reduce(getAmount, 0)}</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
      {
        itemsInCart.map((item) => (
         <div class="products-cart"
            key={item.id}
          >
          {console.log("item in cart", item)}
            <div class="cart-image">
              <img class="img-cart" src={item.image} width="100%" height="auto" alt={item.name} />
            </div> 
            <div class="cart-product-details">
            <h3> {item.name} </h3>
            <p>Rs. {item.price}</p>
            {item.inStock && <p> In Stock </p>}
            {!item.inStock && <p> Out of Stock </p>}
            <p>{item.level}</p>
            {item.fastDelivery ? (
              <p> Fast Delivery </p>
            ) : (
              <p> 3 days minimum </p>
            )}

            <div class="cart-quantity">
            <button class="cart-quantiy-btn"
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
            <button class="cart-quantiy-btn"
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
            </div>
            <div class="cart-remove">
            <button class="cart-btn-remove"
              onClick={() =>
                setItemsInCart((prev) =>
                  prev.filter((items) => items.id !== item.id)
                )
              }
            >
              Remove
            </button>
            </div>
            </div>
          </div>
          ) 
        )
        }
      </div>
    </div>
  );
}
