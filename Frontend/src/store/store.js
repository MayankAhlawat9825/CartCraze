import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/Cartslice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;
