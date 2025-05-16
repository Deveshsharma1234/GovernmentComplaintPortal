
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { use } from 'react'



const useGetAllUser = ()=>{
    return async()=>{
        const response = await axios.get(BASE_URL+"/getAllUsers",{
            withCredentials:true
        })
        return response;
    
    }
}

export default useGetAllUser;