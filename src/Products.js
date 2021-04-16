import React, { useReducer, useState } from "react";
import { data } from "./server";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";

const checkItem = (cartItems, id) => {
  return cartItems.find((item) => item.id === id);
};

export function ProductListing({ setRoute }) {
  const { itemsInCart, setItemsInCart } = useCart();
  const { setItemsInWishList } = useWishlist();
  const [search, setSearch] = useState("");

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly
          });
        case "SORT":
          return {
            ...state,
            sortBy: action.payload
          };
        // case "SEARCH_PRODUCT":
        //   return {
        //     ...state,
        //     searchBy: action.payload
        //   };
        default:
          return state;
      }
    },
    {
      showInventoryAll: true,
      showFastDeliveryOnly: false,
      sortBy: null
      // SearchBy: null
    }
  );

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock))
      .filter((product) => product.name.toLowerCase().includes(search));
  }

  const sortedData = getSortedData(data, sortBy);
  let filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });

  // const searchHandler = (e) => {
  // if (e.keyCode === 13) {
  //   dispatch({ type: "SEARCH_PRODUCT", payload: search });
  //   setSearch("");
  // }
  // };

  return (
    <div>
      <input
        className="txt-input"
        type="text"
        value={search}
        name="searchBy"
        onChange={(e) => setSearch(e.target.value)}
        // onKeyDown={searchHandler}
        placeholder="Search Products"
      />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <fieldset style={{ maxHeight: "10vh" }}>
          <legend>Sort By</legend>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            ></input>
            Price - High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            ></input>
            Price - Low to High
          </label>
        </fieldset>

        <fieldset style={{ maxHeight: "10vh" }}>
          <legend> Filters </legend>
          <label>
            <input
              type="checkbox"
              checked={showInventoryAll}
              onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
            />
            Include Out of Stock
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFastDeliveryOnly}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            Fast Delivery Only
          </label>
        </fieldset>
      </div>
      <div
         style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}
      >
        {filteredData.map((item) => (
          <div
            key={item.id}
            style={{
              textAlign: "center",
              border: "1px solid #4B5563",
              borderRadius: "0 0 0.5rem 0.5rem",
              margin: "1rem",
              maxWidth: "250px",
              padding: "0 0 1rem"
            }}
          >
            <img
              src={item.image}
              width="100%"
              height="auto"
              alt={item.productName}
            />
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
                checkItem(itemsInCart, item.id)
                  ? setRoute("cart")
                  : setItemsInCart((items) => [...items, item]);
              }}
            >
              {checkItem(itemsInCart, item.id) ? "Go to Cart" : "Add to cart"}
            </button>
            <button
              onClick={() => setItemsInWishList((items) => [...items, item])}
            >
              Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
