import axios from "axios"
import { BASE_URL } from "../../utils/constants"

const usecomplaintGraphData = ()=>{
    return async ()=>{
        try {
            const response = await axios.get(BASE_URL+"/complaint-types/stats",{withCredentials: true});
            return response;
            
        } catch (error) {
            return error;
            
        }

    }

}

export default usecomplaintGraphData;