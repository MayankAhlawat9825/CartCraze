import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useParams } from "react-router-dom";
import StarRating from "../components/StartRating";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/Slices/Cartslice"; // ✅ Import addToCart
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handlePayment } from "../utlis/razorpayPayement";

const BASE_IMAGE_URL = "https://cart-craze-server.vercel.app"; // Replace with actual base URL

function Item() {
    const { itemId, parentId } = useParams();
    const [categoryName, setCategoryName] = useState("");
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleCart = () => { // ✅ Renamed function for consistency
        if (item) {
            dispatch(addToCart(item)); // ✅ Now Redux action works
        }
        toast.success("Item added to cart!", { autoClose: 3000 });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        async function loadCategories() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchData();
                const selectedCategory = data.find(
                    (category) => category.id === Number(parentId)
                );

                if (selectedCategory) {
                    setCategoryName(selectedCategory.name);
                    const foundItem = selectedCategory.products.find(
                        (product) => product.id === Number(itemId)
                    );
                    setItem(foundItem);
                } else {
                    setError("Category not found.");
                }
            } catch (err) {
                setError("Failed to load data.");
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, [itemId, parentId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-600 text-lg">{error}</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600 text-lg">Item not found.</div>
            </div>
        );
    }

    const firstProductImagePath = item.image;
    const firstProductImage = firstProductImagePath
        ? `${BASE_IMAGE_URL}${firstProductImagePath}`
        : "placeholder.jpg";

    return (
        <div className="max-w-full mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
            <div className="flex mb-4 justify-center align-center ">
                <img
                    src={firstProductImage}
                    alt={item.title}
                    className="w-1/2 h-1/3 rounded-lg"
                />
            </div>
            <h2 className="text-2xl text-gray-900 font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className="text-lg font-bold text-blue-600">
                        ₹
                        {(
                            Number(item.price) - 
                            (Number(item.price) * Number(item.discount)) / 100
                        ).toFixed(2)}
                    </span>
                    <span className="ml-2 line-through text-gray-500">
                        ₹{item.price}
                    </span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {item.discount}% Off
                </span>
            </div>
            <div className="flex space-x-10 mb-6 justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded w-1/4" onClick={()=>handlePayment(item.price)}>
                    Buy Now
                </button>
                <button 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-400 font-bold py-2 px-4 rounded w-1/4"
                    onClick={handleCart}
                >
                    Add to Cart
                </button>
                <ToastContainer />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-sm text-gray-600">
                        {item.rating?.totalReviews || 0} Reviews
                    </span>
                </div>
                <StarRating averageRating={item.rating?.average || 0} />
            </div>
        </div>
    );
}

export default Item;
