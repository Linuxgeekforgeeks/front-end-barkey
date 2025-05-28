import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const subscribe = async (email, isPremium = false) => {
  try {
    const response = await axios.post(`${API_URL}/api/subscribe`, { email, isPremium });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Subscription failed" };
  }
};