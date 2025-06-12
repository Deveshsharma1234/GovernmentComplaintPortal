// src/hooks/useDeleteUser.js
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import apiClient from "../../utils/apiClient";

const useDeleteUser = () => {
  const deleteUser = async (UserId) => {
    try {
      const response = await apiClient.delete(`${BASE_URL}/user/${UserId}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      return error.response || { status: 500, message: "Unknown error" };
    }
  };

  return deleteUser;
};

export default useDeleteUser;
