import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import apiClient from "../utils/apiClient";

const useRegisterCitizen = () => {
  const register = async (formData) => {
    try {
      const response = await apiClient.post(
        `${BASE_URL}/citizen-register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
    
      throw error; 
    }
  };

  return register;
};

export default useRegisterCitizen