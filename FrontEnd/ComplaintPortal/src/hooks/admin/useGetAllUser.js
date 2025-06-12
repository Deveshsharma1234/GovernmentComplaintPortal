
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import apiClient from '../../utils/apiClient'



const useGetAllUser = ()=>{
    return async()=>{
        const response = await apiClient.get(BASE_URL+"/getAllUsers",{
            withCredentials:true
        })
        return response;
    
    }
}

export default useGetAllUser;