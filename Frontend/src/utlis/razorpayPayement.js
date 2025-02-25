import axios from "axios";

const BACKEND_URL = "https://cart-craze-server.vercel.app"; // Replace with your deployed backend URL

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = async (totalPrice) => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
        alert("Failed to load Razorpay. Check your internet connection.");
        return;
    }
    
    try {
        // ✅ Fetch the Razorpay key from backend
        const { data: { key } } = await axios.get(`${BACKEND_URL}/api/get-razorpay-key`);

        // ✅ Create an order from the backend
        const { data: order } = await axios.post(`${BACKEND_URL}/api/create-order`, {
            amount: totalPrice, // Convert to paisa
            currency: "INR"
        });

        // ✅ Open Razorpay Checkout
        const options = {
            key: key, // ✅ Get the key dynamically from backend
            amount: order.amount,
            currency: order.currency,
            name: "CartCraze",
            description: "Test Transaction",
            order_id: order.id, // ✅ Order ID from backend
            handler: function (response) {
                alert("Payment Successful!");
                console.log(response);
            },
            prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Error while making payment", error);
    }
};
