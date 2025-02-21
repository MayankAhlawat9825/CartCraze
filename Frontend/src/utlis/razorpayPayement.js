import axios from "axios";

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
        const amountInPaisa = totalPrice ; // Convert to paisa

        // Call backend API to create an order
        const { data } = await axios.post("/api/create-order", {
            amount: amountInPaisa,
            currency: "INR"
        });

        // Open Razorpay Checkout
        const options = {
            key: "YOUR_KEY", // Replace with your Razorpay test key
            amount: data.amount,
            currency: data.currency,
            name: "CartCraze",
            description: "Test Transaction",
            order_id: data.id, // Order ID from backend
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
