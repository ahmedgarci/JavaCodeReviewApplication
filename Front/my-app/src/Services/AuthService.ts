import type { LoginCredentials, RegisterCredentials, SuccessFulAuthentication } from "../Models/AuthResponse";
import api from "./Api/api";

const authService = {
  login: async (credentials:LoginCredentials):Promise<SuccessFulAuthentication> => {
    try {
      const response = await api.publicApi.post("/auth/login", credentials);
      return response.data;
    } catch (error:any) {
      throw error.response.data
    }
   
  },

  register: async (user:RegisterCredentials) => {
    const response = await api.publicApi.post("/auth/register", user);
    return response.data;
  },

  logout: async () => {
    const response = await api.privateApi.post("/logout");
    console.log(response);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.publicApi.post("/auth/me");
    return response.data;
  }
};

export default authService;