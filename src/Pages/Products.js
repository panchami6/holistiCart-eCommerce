import React, { useReducer, useState, useEffect } from "react";
import "../styles.css";
import "./home.css";
import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";
import axios from "axios";

export const checkItemInCart = (cartItems, _id) => {
  return cartItems.find((item) => item._id === _id);
};

export const checkItemInWishlist = (wishlistItems, _id) => {
  return wishlistItems.find((item) => item._id === _id);
};

export function ProductListing() {
  const { cartState, cartDispatch } = useCart();
  const {cart} = cartState;
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { wishlist } = wishlistState;
  const [search, setSearch] = useState("");
  const [showProducts, setShowProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const api = "https://holisticart.panchami6.repl.co/products";
  const cartApi = "https://holisticart.panchami6.repl.co/cart";
  const wishlistApi = "https://holisticart.panchami6.repl.co/wishlist";

  useEffect(() => {
    (async function () {
      setLoader(true);
      const response = await axios.get(api);
      setLoader(false);
      setShowProducts(response.data.products);
    })();
  }, []);

  const addtoCart = async (item) => {
    try {
        await axios.post(cartApi, { _id:item._id});     
        cartDispatch({type:"ADD_TO_CART", payload:item._id})
    } catch (error) {
        console.error(error);
    }
 }

 const addToWishlist = async (item) => {
   try{
    await axios.post(wishlistApi, { _id:item._id});
    wishlistDispatch({type:"ADD_TO_WISHLIST", payload:item._id})
   } catch(error){
    console.error(error);
   }
 }

 const removeFromWishlist = async (item) => {
  try{
   await axios.delete(`${wishlistApi}/${item._id}`);
  wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item._id})
  } catch(error){
   console.error(error);
  }
}


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

  const sortedData = getSortedData(showProducts, sortBy);
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
      {loader && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
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
            key={item._id}
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
            
            <button className = {item.inStock? "btn-primary" : "btn-disabled"}
            disabled={!item.inStock}
              onClick = {() =>
              {
                if(!checkItemInCart(cart, item._id)) addtoCart(item)
              }
              }
            >
              {checkItemInCart(cart, item._id) ? "Item In cart" : "Add to cart"}
            </button>
              <i onClick={() =>
              { checkItemInWishlist(wishlist, item._id) ? removeFromWishlist(item)
                :
                addToWishlist(item) } }
                className={checkItemInWishlist(wishlist, item._id) ? "fas fa-heart wishlist-btn" : "far fa-heart wishlist-btn"}></i>
          </div>
        ))}
      </div>
    </div>
  );
}
