import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, parentId,title, description, image, discount, price, ...props }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (id) {
        // Navigate to product page if child ID is present
        navigate(`/category/${parentId}/product/${id}`);
    } else {
        // Navigate to category page if only parent ID is present
        navigate(`/category/${parentId}`);
    }
};
  return (
    <div
      className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer w-full"
      {...props}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-75 object-cover rounded-md object-cover"
      />
      <h3 className="text-lg font-medium text-gray-900 mt-4">{title}</h3>
      <div className="text-sm text-gray-600 mt-1 flex justify-evenly">
        {price && <div className="flex flex-col">
            {price && <span className="font-semibold text-blue-600">Price: ₹{(Number(price)-(Number(price)*(Number(discount/100))).toFixed(2))}</span>}

            {price && <span className="font-semibold text-blue-600 line-through">₹{price}</span>}
        </div>}
        <span className="font-semibold text-blue-600">Discount: {discount} %</span>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
      onClick={handleNavigation}>
        Explore
      </button> 
    </div>
  );
};

export default Card;
