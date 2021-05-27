export function wishlistReducer(wishlistState, action ){
      
    switch (action.type) {
        case "WISHLIST_DATA":
                return { 
                    ...wishlistState, 
                    wishlist: action.payload 
                };

        case "MOVE_TO_CART":
                return {
                    ...wishlistState, 
                    wishlist: [...wishlistState.wishlist, action.payload]
                };
        
        case "REMOVE_FROM_WISHLIST":
            return {
                ...wishlistState, 
                wishlist: wishlistState.wishlist.filter(item => item._id !== action.payload)
            };
        
        default:
            return{
                ...wishlistState
            }
    }

}