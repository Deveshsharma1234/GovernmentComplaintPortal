import axios from "axios"
import { BASE_URL } from "../../utils/constants"


const useComplaintStats = ()=>{

    return async()=>{

        try {
            const response = await axios.get(BASE_URL+"/statuses/stats",{withCredentials: true});
            return response;
            
        } catch (error) {
            console.log(error)
        
            return error.response || { status: 500, message: "Unknown error" };
            
        }
    }

}

export default useComplaintStats;