import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const subscribe = async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/subscribe`, data);
  return response.data;
};

export const unsubscribe = async (token) => {
  const response = await axios.post(`${API_URL}/api/v1/unsubscribe`, { token });
  return response.data;
};

export const getSubscribers = async (token) => {
  const response = await axios.get(`${API_URL}/api/v1/subscribers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  useNewsletterStore.getState().setSubscribers(response.data);
  return response.data;
};


export const sendNewsletter = async (data, token) => {
  const response = await axios.post(`${API_URL}/api/newsletter`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};