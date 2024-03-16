import axios from "axios";
import { base_api_url } from "@/helper/Url";

export const getAll = async () =>{
    try{
        const result = await axios.get(base_api_url('formula/variables'), {

        }).then(res => res);

        return result;
    }catch(res: any){
        return res.response
    }
    
}