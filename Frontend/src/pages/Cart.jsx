import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "../store/Slices/Cartslice"; // Import actions
import { handlePayment } from "../utlis/razorpayPayement";


function Cart() {
    const cartItemData = useSelector((state) => state.cart.cart);
    console.log(cartItemData);
    
    const dispatch = useDispatch();
    const BASE_IMAGE_URL = "https://cart-craze-server.vercel.app/api"; // Base image URL
    const totalDiscountAmount = cartItemData.reduce(
        (acc, item) => acc + ((Number(item.price) * Number(item.discount)) / 100) * item.quantity,
        0
    );
    const totalPriceBeforeDiscount = cartItemData.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity, 
        0
    );
    
    // Avoid division by zero
    const averageDiscount = totalPriceBeforeDiscount > 0 
        ? (totalDiscountAmount / totalPriceBeforeDiscount) * 100 
        : 0;
    
    const totalTaxApplied = cartItemData.reduce(
        (acc, item) => acc + (Number(item.price) * 0.18) * item.quantity, 
        0
    );
    
    const realTotalFee = cartItemData.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity, 
        0
    );
    
    const totalPrice = realTotalFee - totalDiscountAmount + totalTaxApplied;
    

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-row gap-10  justify-center align-center ">
            <div className="w-3/4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🛒 Shopping Cart</h1>

                {cartItemData.length === 0 ? (
                <p className="text-gray-600 text-center p-4 bg-gray-100 rounded-lg">Your Cart Is Empty</p>
                 ) : (
                <div className="space-y-6 ">
                    {cartItemData.map((item) => {
                    const firstProductImage = item.image ? `${BASE_IMAGE_URL}${item.image}` : "placeholder.jpg";

                return (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
                        {/* Product Image */}
                        <img src={firstProductImage} alt={item.title} className="w-35 h-35 object-cover rounded-lg" />

                        {/* Product Details */}
                        <div className="flex-1 ml-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
                            <p className="text-gray-600 text-sm">Price: ₹{(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100).toFixed(2)}</p>
                            <p className="text-gray-500 text-sm">Discount: {item.discount}%</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mr-2 bg-gray-300 p-2 rounded-lg">
                            <button
                                onClick={() => dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }))}
                                disabled={item.quantity === 1}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                            >
                                ➖
                            </button>
                            <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>
                            <button
                                onClick={() => dispatch(addToCart(item))}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                ➕
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            ❌
                        </button>
                    </div>
                    );
                })}
            </div>
        )}
            </div>
            {cartItemData.length === 0 ? (
                null
                 ):(<div className="text-2xl font-bold text-gray-800 mb-4 w-1/4 bg-gray-200 rounded-lg p-3 h-1/2">
                <h2 className="mb-3 text-3xl">Cart Balance</h2>
                <div className="flex justify-between text-lg bg-gray-100 rounded-lg p-3 mb-5">
                    <span>Price:</span>
                    <span>₹{realTotalFee}</span>
                </div>
                <div className="flex justify-between text-lg bg-gray-100 rounded-lg p-3 mb-5">
                    <span>Shipping Fee:</span>
                    <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg bg-gray-100 rounded-lg p-3 mb-5">
                    <span>Tax(18%)</span>
                    <span>₹{(totalTaxApplied).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg bg-gray-100 rounded-lg p-3 mb-5">
                    <span>Discount({(averageDiscount).toFixed(2)}%)</span>
                    <span>-₹{(totalDiscountAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg bg-gray-100 rounded-lg p-3 mb-10">
                    <span>Estimated Cost</span>
                    <span>₹{(totalPrice).toFixed(2)}</span>
                </div>
                <div>
                    <button type="submit" className="text-gray-200" onClick={()=>handlePayment((totalPrice).toFixed(2))}>Buy Now</button>
                </div>
            </div>)}
        </div>
    );
}

export default Cart;
