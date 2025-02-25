import { useEffect, useState } from "react";
import { fetchData } from "../api";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/Slices/Cartslice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_IMAGE_URL = "https://cart-craze-server.vercel.app"; // Replace with actual base URL

function Product() {
    const { parentId } = useParams();
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
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
                    setCategories(selectedCategory.products);
                } else {
                    setError("Category not found.");
                }
            } catch (err) {
                setError("Failed to load products.");
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, [parentId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-lg text-gray-600">Loading Products...</p>
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

    return (
        <div className="min-h-screen bg-gray-200 p-10">
            <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">
                {categoryName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => {
                    const firstProductImagePath = category.image;
                    const firstProductImage = firstProductImagePath
                        ? `${BASE_IMAGE_URL}${firstProductImagePath}`
                        : "placeholder.jpg";

                        return (
                            <div key={category.id} className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
                                {/* Card Component */}
                                <Card
                                    id={category.id}
                                    parentId={parentId}
                                    title={category.title}
                                    price={category.price}
                                    image={firstProductImage}
                                    discount={category.discount}
                                />
                    
                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => {
                                        dispatch(addToCart(category));
                                        toast.success("Item added to cart!", { autoClose: 3000 });
                                    }}
                                    className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Add to Cart
                                </button>
                                <ToastContainer position="top-right" autoClose={3000} />
                            </div>
                        );
                })}
            </div>
        </div>
    );
}

export default Product; 