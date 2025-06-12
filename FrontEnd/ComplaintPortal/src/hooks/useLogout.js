import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/slice/userSlice'
import apiClient from '../utils/apiClient'
import { useNavigate } from 'react-router'


    const useLogout = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        return async () => {

            try {
                const res = await apiClient.post(BASE_URL + `/logout`, { withCredentials: true });
                toast.success(res.data.message);
                dispatch(removeUser());
                navigate('/login');

            } catch (error) {
                toast.error(error.response.data.message)

            }


        }

    }


export default useLogout