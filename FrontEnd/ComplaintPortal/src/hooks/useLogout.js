import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/slice/userSlice'


    const useLogout = () => {
        const dispatch = useDispatch();
        return async () => {
            try {
                const res = await axios.post(BASE_URL + `/logout`, { withCredentials: true });
                toast.success(res.data.message);
                dispatch(removeUser());


            } catch (error) {
                toast.error(error.response.data.message)

            }


        }

    }


export default useLogout