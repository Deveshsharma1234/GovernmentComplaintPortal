import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import apiClient from "../utils/apiClient";

const useUpdateProfile = () => {
    const dispatch = useDispatch();

    return async (formData) => {
        try {
            const response = await apiClient.patch(`${BASE_URL}/user`, formData, {
                withCredentials: true,
            });

            toast.success(response.data.message, { theme: "dark" });
            dispatch(addUser(response.data.updatedUser));

        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed", {
                theme: "dark",
            });
        }
    };
};

export default useUpdateProfile;
