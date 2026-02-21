import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import apiClient from "../utils/apiClient";

const useComplaintData =()=>{
    const[complaintTypes,setComplaintTypes] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error,setError]=useState(null);

    const fetchComplaintTypes = async ()=>{
        setLoading(true);
        setError(null);
        try{
            const response = await apiClient.get(BASE_URL+"/complaints/types",{
                withCredentials:true
            });
            const types = response.data?.types || [];
            setComplaintTypes(types);    
        }catch(err){
                console.log(err);
                setError(err);
                setComplaintTypes([]);
            }
            finally{
                setLoading(false);
                console.log(complaintTypes);
            }
    };
  
    useEffect(()=>{fetchComplaintTypes();},[]);

    return {
        complaintTypes,loading,error
    }
}
export default useComplaintData;