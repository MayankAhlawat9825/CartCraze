import axios from "axios";


// Fetch everything in one go
export const fetchData = async () => {
    try {
        const response = await axios.get("/api/category");
        console.log(response.data);
        
        return response.data; // Returns an object with multiple datasets
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

