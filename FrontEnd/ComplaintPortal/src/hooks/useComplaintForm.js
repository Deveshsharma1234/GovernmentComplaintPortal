import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';
import apiClient from '../utils/apiClient';

export default function useComplaintForm(initialState) {
  const [formData, setFormData] = useState(initialState); //getting and setting intial state of form data obj
  const [message, setMessage] = useState('');

  //creating obj with updated key values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //post submit complaint
  const handleSubmit = async (e, images) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    Object.entries(images).forEach(([key, file]) => file && data.append(key, file));

    try {
      const res = await apiClient.post(BASE_URL + '/complaints', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setMessage(res.data.message);
      console.log(message)
      if (res.data.message === "Complaint registered successfully") {
        toast.success(res.data.message, {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      return true;

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to register complaint');
      toast.error(err.response?.data?.message || 'Failed to register complaint', {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return false;
    }
  };

  return { formData, setFormData, handleChange, handleSubmit, message };
}
