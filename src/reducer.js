// export const itemsInCartWishList = {
//   itemsInCart: [],
//   itemsInWishList: []
// };

// export const INCREMENT = "INCREMENT";
// export const DECREMENT = "DECREMENT";
// export const ADD_TO_CART = "ADD_TO_CART";
// export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
// export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";

// export const cartWishlistReducer = (state, { type, id, item }) => {
//   const { itemsInCart, itemsInWishList } = state;
//   switch (type) {
//     case "INCREMENT":
//       return {
//         ...state,
//         itemsInCart: itemsInCart.map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       };

//     case "DECREMENT":
//       return {
//         ...state,
//         itemsInCart: itemsInCart.map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//       };

//     case "ADD_TO_CART":
//       return {
//         ...state,
//         itemsInCart: itemsInCart.concat(state.item)
//       };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         itemsInCart: itemsInCart.filter((prevItem) => prevItem.id !== id)
//       };

//     case "ADD_TO_WISHLIST":
//       return {
//         ...state,
//         itemsInWishList: itemsInWishList.concat(state.item)
//       };

//     case "REMOVE_FROM_WISHLIST":
//       return {
//         ...state,
//         itemsInWishList: itemsInWishList.filter((item) => item.id !== id)
//       };

//     default:
//       return state;
//   }
// };
