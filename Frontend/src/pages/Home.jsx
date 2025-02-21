import { useEffect, useState } from "react";
import { fetchData } from "../api";
import Card from "../components/Card";
import bgimage from "../Image/Home-Background.jpg"
import {nike , adidas , gucci , puma , underArmour,apple,hp,philips,samsung,zara} from "../Image"

const BASE_IMAGE_URL = "/api"; // Replace with actual base URL

function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        async function loadCategories() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchData();
                setCategories(data);
            } catch (err) {
                setError("Failed to load categories.");
                console.error("Error loading categories:", err);
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-lg text-gray-600">Loading Categories...</p>
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
            <div className="relative w-full mx-auto">
                {/* Image */}
                <img
                    src={bgimage}
                    alt="Sample"
                    className="w-full h-[750px] rounded-lg shadow-lg z-10"
                />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center w-1/2 bg-opacity-50 rounded-lg flex flex-col z-20">
                    <p className="text-7xl font-bold mb-5">Shop by Category</p>
                    <p className="text-black text-2xl">
                    Find everything you need to express your style, from timeless classics to the latest trends—all in one place!
                    </p>
                </div>
            </div>
            <div className="w-full py-8 bg-gray-100 mt-8 rounded-lg shadow-md mb-8">
              <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Our Trusted Brands</h2>
              
              <div className="flex justify-center gap-15 flex-wrap px-4 ">
                {/* Replace these with actual brand SVGs */}
                <img src={nike} alt="Nike" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={adidas} alt="Adidas" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={puma} alt="Puma" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={gucci} alt="Gucci" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={apple} alt="apple" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={hp} alt="hp" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={samsung} alt="samsung" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={philips} alt="philips" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={zara} alt="zara" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
                <img src={underArmour} alt="Under Armour" className="h-16 opacity-50 hover:opacity-80 transition-opacity duration-300" />
              </div>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => {
                    const firstProductImagePath = category.products?.[0]?.image;
                    const firstProductImage = firstProductImagePath
                        ? `${BASE_IMAGE_URL}${firstProductImagePath}`
                        : "placeholder.jpg";

                    return (
                        <Card
                            key={category.id}
                            parentId={category.id}
                            title={category.name}
                            image={firstProductImage}
                            discount={category.discount}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;