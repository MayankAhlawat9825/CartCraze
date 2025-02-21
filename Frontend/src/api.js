import axios from "axios";

const BASE_URL = "/api"; // Deployed backend URL

export const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/category`);
        console.log(response.data);
        
        return response.data; // Returns an object with multiple datasets
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
