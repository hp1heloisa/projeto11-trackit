import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import styled from "styled-components";

export default function Hoje(){
    
    const location = useLocation();
    const config = location.state;
    const data = new Date();
    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    let [habitos, setHabitos] = useState([]);

    let dia = [data.getDate(),data.getMonth()+1];
    if (dia[1]<10){
        dia = dia.join('/0');
    } else{
        dia = dia.join('/');
    }
    dia = dias[data.getDay()] + ', ' + dia;
    console.log(dia);

    useEffect(()=>{
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config);
        promise.then(resp => {
            setHabitos(resp.data);
            console.log(habitos);
        });
        promise.catch(erro => console.log(erro));
    },[])


    if (habitos.length == 0){
        return(
            <DivHoje>
                <h1>{dia}</h1>
                <h2>Nenhum hábito concluído ainda</h2>
            </DivHoje>
        )
    } else{
        return(
            <DivHoje>
                <h1>{dia}</h1>
                <h2>67% dos hábitos concluídos</h2>
            </DivHoje>
        )
    }
}


const DivHoje = styled.div`
    padding-top: 28px;
    padding-left: 17px;
    h1{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h2{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
    }

`