import { wishlistReducer } from "./wishlist-reducer";


describe("testing wishlist operations on wishlist reducer", () =>{
    test("should load the products which are already in wishlist when user logs in", () => {
        const action = {
            type: "WISHLIST_DATA",
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
            wishlist:[]
        };

        const wishlistState = wishlistReducer(initailState, action)

        expect(wishlistState).toEqual({
            wishlist:[
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

    test("should add a product to wishlist", () => {
        const action = {
            type: "ADD_TO_WISHLIST",
            payload: {
                    _id:"61058f56a2a21700684779ea",
                    name:"Dr Trust Model Exercise Mats",
                    price:859,
                    inStock:true,
                    fastDelivery:false,
                    quantity:1
                }
        }
        
        let wishlistState = {
            wishlist:[
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

        wishlistState = wishlistReducer(wishlistState, action)

        expect(wishlistState).toEqual({
            wishlist:[
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

    test("should remove a product from wishlist", () => {
        const action = {
            type: "REMOVE_FROM_WISHLIST",
            payload:"61058f56a2a21700684779ea"
        }
        
        let wishlistState = {
            wishlist:[
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

        wishlistState = wishlistReducer(wishlistState, action)

        expect(wishlistState).toEqual({
            wishlist:[
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

    // it("should increase quantity of a product by one", () => {

    //     const action = {
    //         type: "INCREASE_QUANTITY",
    //         payload: {
    //                 productId:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:1
    //             }
    //     }

    //     let cartState = {
    //         cart:[
    //             {
    //                 _id:"61058f56a2a21700684779e6",
    //                 name:"Self Design Men Blue T-Shirt",
    //                 price:1049,
    //                 inStock:true,
    //                 fastDelivery:true,
    //                 quantity:1
    //             },
    //             {
    //                 _id:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:1
    //             }
    //         ]
    //     }


    //     cartState = cartReducer(cartState, action)

    //     expect(cartState).toEqual({
    //         cart:[
    //             {
    //                 _id:"61058f56a2a21700684779e6",
    //                 name:"Self Design Men Blue T-Shirt",
    //                 price:1049,
    //                 inStock:true,
    //                 fastDelivery:true,
    //                 quantity:1
    //             },
    //             {
    //                 _id:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:2
    //             }
    //         ]
    //     })

    // })

    // it("should decrease quantity of a product by one", () => {

    //     const action = {
    //         type: "DECREASE_QUANTITY",
    //         payload: {
    //                 productId:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:1
    //             }
    //     }

    //     let cartState = {
    //         cart:[
    //             {
    //                 _id:"61058f56a2a21700684779e6",
    //                 name:"Self Design Men Blue T-Shirt",
    //                 price:1049,
    //                 inStock:true,
    //                 fastDelivery:true,
    //                 quantity:1
    //             },
    //             {
    //                 _id:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:3
    //             }
    //         ]
    //     }


    //     cartState = cartReducer(cartState, action)

    //     expect(cartState).toEqual({
    //         cart:[
    //             {
    //                 _id:"61058f56a2a21700684779e6",
    //                 name:"Self Design Men Blue T-Shirt",
    //                 price:1049,
    //                 inStock:true,
    //                 fastDelivery:true,
    //                 quantity:1
    //             },
    //             {
    //                 _id:"61058f56a2a21700684779ea",
    //                 name:"Dr Trust Model Exercise Mats",
    //                 price:859,
    //                 inStock:true,
    //                 fastDelivery:false,
    //                 quantity:2
    //             }
    //         ]
    //     })

    // })

    
})

