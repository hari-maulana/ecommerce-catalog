// utils/fetchProducts.js
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array on error so it can be safely handled
  }
};
