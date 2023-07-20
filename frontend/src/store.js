import {configureStore} from "@reduxjs/toolkit"
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer,productsReducer } from "./Reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "./Reducers/orderReducer";
import { allUsersReducer,userDetailsReducer } from "./Reducers/userReducer";
const store = configureStore({
    reducer:{
        products:productsReducer,
        productDetails:productDetailsReducer,
        user : userReducer,
        profile:profileReducer,
        forgotPassword : forgotPasswordReducer,
        cart:cartReducer,
        newOrder : newOrderReducer,
        myOrders : myOrdersReducer,
        orderDetails : orderDetailsReducer,
        newReview :newReviewReducer,
        newProduct : newProductReducer,
        product : productReducer,
        allOrders : allOrdersReducer,
        order : ordersReducer,
        allUsers : allUsersReducer,
        userDetails : userDetailsReducer
    }
});

export default store;