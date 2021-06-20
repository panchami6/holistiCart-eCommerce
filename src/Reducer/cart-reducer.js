export function cartReducer(cartState, action ){
      
    switch (action.type) {
        case "CART_DATA":
                return { 
                    ...cartState, 
                    cart: action.payload 
                };

        case "ADD_TO_CART":
                return {
                    ...cartState, 
                    cart: [...cartState.cart, action.payload]
                };
        
        case "DELETE_FROM_CART":
            return {
                ...cartState, 
                cart: cartState.cart.filter(item => item._id !== action.payload)
            };
        
        case "INCREASE_QUANTITY":
            return {
                ...cartState, 
                cart: cartState.cart.map(item => item._id === action.payload.productId ? {...item, quantity: item.quantity + 1} : item)
            };
            
        case "DECREASE_QUANTITY": 
            return {
                ...cartState, 
                cart: cartState.cart.map(item => item._id === action.payload.productId ? {...item, quantity: item.quantity - 1} : item)
            };

        default:
            return{
                ...cartState
            }
    }

}