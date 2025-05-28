import { userAuthStore } from "@/stores/auth.store";
import axios from "axios";


const API_URL=process.env.NEXT_PUBLIC_BACKEND_URL

export const register=async(data)=>{
    const response= await axios.post(`${API_URL}/api/v1/register`,data)
    return response.data;
}


export const login=async (data)=>{
    const response = await axios.post(`${API_URL}/api/v1/login`, data);
  const { token, user } = response.data;

  userAuthStore.getState().setAuth(user,token)
  return response.data;
}