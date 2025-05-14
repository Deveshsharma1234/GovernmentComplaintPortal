import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const useRegisterCitizen = () => {
  const register = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/citizen-register`,
        formData,
        { withCredentials: true }
      );
      return response.data; // ✅ Fix: Return response data
    } catch (error) {
    
      throw error; // ✅ Fix: Re-throw error so the calling function can handle it
    }
  };

  return register;
};

export default useRegisterCitizen