import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/E-commerce-logo.jpg";
import { fetchData } from "../../api"; // Import your API fetch function

function Header() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null); 
    const dropdownContentRef = useRef(null); 

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchData();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error); 
            }
        }
        loadCategories();
    }, []);

    const handleProductHover = () => {
        setIsProductDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        setIsProductDropdownOpen(false);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsProductDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='p-4 bg-gray-900  w-full top-0 left-0 z-[100] shadow-md'>
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <div>
                    <Link to="/"><img src={logo} alt="Logo" className='w-25 h-20' /></Link>
                </div>
                
                {/* Navigation */}
                <div className='flex gap-10 items-center text-xl relative' ref={dropdownRef}>
                    <Link to="/" className="text-blue-300">Home</Link>

                    {/* Product Dropdown */}
                    <div 
                        onMouseEnter={handleProductHover} 
                        className="relative text-blue-300"
                    >
                        Product
                        {isProductDropdownOpen && (
                            <div
                                ref={dropdownContentRef}
                                onMouseLeave={handleDropdownLeave}
                                className="absolute left-0 mt-2 bg-white z-[200] shadow-lg rounded-lg w-48"
                            >
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/category/${category.id}`}
                                        className="block px-3 py-2 text-gray-700 font-bold bg-white hover:bg-gray-200"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/faq" className="text-blue-300">Help</Link>
                    <Link to="/cart" className="text-blue-300">Cart</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
