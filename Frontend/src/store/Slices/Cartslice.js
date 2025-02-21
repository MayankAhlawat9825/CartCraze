import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage (if exists)
const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error("Error loading cart from storage:", error);
        return [];
    }
};

const initialState = {
    cart: loadCartFromStorage(), // ✅ Load cart from storage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to storage
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to storage
        },
        updateCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to storage
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem("cart"); // ✅ Remove cart from storage
        }
    }
});

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
