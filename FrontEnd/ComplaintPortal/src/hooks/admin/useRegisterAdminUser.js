import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import apiClient from "../../utils/apiClient";

const useRegisterAdminUser = () => {
    const register = async (formData) => {
        try {
            const response = await apiClient.post(
                `${BASE_URL}/admin/register`,
                formData,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return register;
};

export default useRegisterAdminUser;
