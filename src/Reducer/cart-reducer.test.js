import { cartReducer } from "./cart-reducer";


describe("testing cart operations on cart reducer", () =>{
    test("should load the products which are already in cart when user logs in", () => {
        const action = {
            type: "CART_DATA",
            payload: [
                {
                    _id:"61058f56a2a21700684779e5",
                    name:"Sporty Women Pink T-Shirt",
                    price:1299,
                    inStock:false,
                    fastDelivery:false,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                }
            ]
        }
        const initailState = {
            cart:[]
        };

        const cartState = cartReducer(initailState, action)

        expect(cartState).toEqual({
            cart:[
                {
                    _id:"61058f56a2a21700684779e5",
                    name:"Sporty Women Pink T-Shirt",
                    price:1299,
                    inStock:false,
                    fastDelivery:false,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                } 
            ]
        })
    })

    test("should add a product to cart", () => {
        const action = {
            type: "ADD_TO_CART",
            payload: {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }
        }
        
        let cartState = {
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                } 
            ]
        }

        cartState = cartReducer(cartState, action)

        expect(cartState).toEqual({
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }

            ]
        })
    })

    test("should remove a product from cart", () => {
        const action = {
            type: "DELETE_FROM_CART",
            payload:"61058f56a2a21700684779ea"
        }
        
        let cartState = {
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:2
                }
            ]
        }

        cartState = cartReducer(cartState, action)

        expect(cartState).toEqual({
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },

            ]
        })
    })

    it("should increase quantity of a product by one", () => {

        const action = {
            type: "INCREASE_QUANTITY",
            payload: {
                    productId:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }
        }

        let cartState = {
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }
            ]
        }


        cartState = cartReducer(cartState, action)

        expect(cartState).toEqual({
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:2
                }
            ]
        })

    })

    it("should decrease quantity of a product by one", () => {

        const action = {
            type: "DECREASE_QUANTITY",
            payload: {
                    productId:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }
        }

        let cartState = {
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:3
                }
            ]
        }


        cartState = cartReducer(cartState, action)

        expect(cartState).toEqual({
            cart:[
                {
                    _id:"61058f56a2a21700684779e6",
                    name:"Self Design Men Blue T-Shirt",
                    price:1049,
                    inStock:true,
                    fastDelivery:true,
                    quantity:1
                },
                {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:2
                }
            ]
        })

    })

    
})

