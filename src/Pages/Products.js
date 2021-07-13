import React, { useReducer, useState, useEffect } from "react";
import "../styles.css";
import "./home.css";
import { useCart } from "../Context/cart-context";
import { useWishlist } from "../Context/wishlist-context";
import { useAuth } from "../Context/auth-context";
import axios from "axios";

export const checkItemInCart = (cartItems, _id) => {
  return cartItems.find((item) => item.productId === _id);
};

export const checkItemInWishlist = (wishlistItems, _id) => {
  return wishlistItems.find((item) => item.productId === _id);
};

export function ProductListing() {
  const { cartState, cartDispatch } = useCart();
  const {cart} = cartState;
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { wishlist } = wishlistState;
  const [search, setSearch] = useState("");
  const [showProducts, setShowProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const {userId} = useAuth();

  const api = "https://holisticart.panchami6.repl.co/products";
  const cartApi = `https://holisticart.panchami6.repl.co/cart/${userId}`;
  const wishlistApi = `https://holisticart.panchami6.repl.co/wishlist/${userId}`;

  useEffect(() => {
    (async function () {
      setLoader(true);
      const response = await axios.get(api);
      setLoader(false);
      setShowProducts(response.data.products);
    })();
  }, []);

    useEffect(() => {
      (async function () {
        try{
        const response = await axios.get(cartApi);
        const cartData = response.data.cart.products;
        cartDispatch({type:"CART_DATA", payload: cartData});
        }catch(error){
          console.log(error)
        }
      })();
    },[])

  useEffect(() => {
    (async function () {
      try{
        const response = await axios.get(wishlistApi);
        const wishlistData = response.data.wishlist.products;
        wishlistDispatch({type: "WISHLIST_DATA", payload:wishlistData})
      }catch(error){
        console.log(error)
      }
      
    })();
  }, []);

  const addtoCart = async (item) => {
    try {
        await axios.post(cartApi, { productId:item._id, quantity:item.quantity, name:item.name, price:item.price, image:item.image, inStock: item.inStock, fastDelivery: item.fastDelivery });     
        cartDispatch({type:"ADD_TO_CART", payload:{productId}})
    } catch (error) {
        console.error(error);
    }
 }

 const addToWishlist = async (item) => {
   try{
    await axios.post(wishlistApi, { productId:item._id, quantity:item.quantity, name:item.name, price:item.price, image:item.image, inStock:item.inStock, fastDelivery: item.fastDelivery});
    wishlistDispatch({type:"ADD_TO_WISHLIST", payload:{productId}})
   } catch(error){
    console.error(error);
   }
 }

 const removeFromWishlist = async (item) => {
  try{
   await axios.delete(`${wishlistApi}/${item.productId}`);
  wishlistDispatch({type:"REMOVE_FROM_WISHLIST", payload:item.productId})
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
    <div className = "products-page">
      {loader && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
      <div className = "side-bar">
        <div className ="search"
        >
          <input
            className="input-search" 
            type="text"
            value={search}
            name="searchBy"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
          />
          <i className="fas fa-search"></i> 
        </div>
     
        <div
        >
          <div>
          <fieldset className="filters">
            <legend>Sort By</legend>
            <div>
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
            </div>
            <div>
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
            </div>
          </fieldset>
          </div>
          <div>
          <fieldset className="filters">
          
            <legend> Filters </legend>
            <div>
            <label>
              <input
                type="checkbox"
                checked={showInventoryAll}
                onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              />
              Include Out of Stock
            </label>
            </div>
            <div>
            <label>
              <input
                type="checkbox"
                checked={showFastDeliveryOnly}
                onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              />
              Fast Delivery Only
            </label>
            </div>
          </fieldset>
          </div>
        </div>
      </div>
      <div className = "product-cards"
      >
        {filteredData.map((item) => (
          <div className="products"
            key={item._id}
          >
            <img
              src={item.image}
              width="100%"
              height="auto"
              alt={item.name}
            />
            <h3> {item.name} </h3>
            <div className = "product-details">
              {item.inStock && <div> In Stock </div>}
              {!item.inStock && <div> Out of Stock </div>}
              <div>{item.level}</div>
              {item.fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
              <strong>Rs. {item.price}</strong>
            </div>
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
