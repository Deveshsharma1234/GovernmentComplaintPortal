import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import apiClient from "../../utils/apiClient";

const usecomplaintGraphData = ()=>{
    return async ()=>{
        try {
            const response = await apiClient.get(BASE_URL+"/complaint-types/stats",{withCredentials: true});
            return response;
            
        } catch (error) {
            return error;
            
        }

    }

}

export default usecomplaintGraphData;