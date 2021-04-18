import React, { useReducer, useState } from "react";
import "./styles.css";
import { data } from "./server";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { Routes, Route, Link } from 'react-router-dom';

const checkItem = (cartItems, id) => {
  return cartItems.find((item) => item.id === id);
};

export function ProductListing() {
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
        default:
          return state;
      }
    },
    {
      showInventoryAll: true,
      showFastDeliveryOnly: false,
      sortBy: null
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

  return (
    <div>
      <div class="search"
      >
        <input
          className="input-search" 
          type="text"
          value={search}
          name="searchBy"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products"
        />
        <i class="fas fa-search"></i> 
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <fieldset class="filters">
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

        <fieldset class="filters">
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
          <div class="products"
            key={item.id}
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
            
            <button class="product-btn"
            disabled={!item.inStock}
              onClick={() => {
                checkItem(itemsInCart, item.id)
                  ? <Link to="/Products">Products</Link>
                  : setItemsInCart((items) => [...items, item]);
              }}
            >
              {checkItem(itemsInCart, item.id) ? "Item in cart" : "Add to cart"}
            </button>
            
            <button class="product-btn"
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
