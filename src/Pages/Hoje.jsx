import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function Hoje(){
    
    const location = useLocation();
    const config = location.state;
    
    useEffect(()=>{
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config);
        promise.then(resp => console.log(resp));
        promise.catch(erro => console.log(erro));
    },[])


    return(
        <div>
            hoje
        </div>
    )
}