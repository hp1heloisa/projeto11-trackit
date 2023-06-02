import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { ValoresContext } from "../arquivoContext";
import axios from "axios";
import Calendar from "react-calendar";

export default function Historico(){
    const {acesso, setAcesso, setImage} = useContext(ValoresContext);
    let [render, setRender] = useState('');
    
    useEffect(()=>{
        if (!acesso.headers){
            let dados = localStorage.getItem('dadosUsuario');
            dados = JSON.parse(dados);
            setAcesso({headers: {Authorization: `Bearer ${dados.token}`}});
            setImage(dados.image);
            setRender(1);
        } else{
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily',acesso);
            promise.then(resp => console.log(resp.data));
            promise.catch(erro => console.log(erro));
        }
    },[render]);

    return(
        <HeaderHistorico>
            <h1>Histórico</h1>
            <StyledCalendar />
        </HeaderHistorico>
    )
}

const HeaderHistorico = styled.div`
    box-sizing: border-box;
    font-family: 'Lexend Deca';
    font-weight: 400;
    padding-left: 17px;
    padding-top: 28px;
    h1{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    p{
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-top: 17px;
    }
`

const StyledCalendar = styled(Calendar)`
    react-calendar {
  width: 100%;
  background: white;
  border: 1px solid #a0a096;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
}

.react-calendar--doubleView {
  width: 700px;
}

.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}

.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}

.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}

.react-calendar button:enabled:hover {
  cursor: pointer;
}

.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
}

.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}

.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}

.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__days__day--neighboringMonth {
  color: #757575;
}

.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}

.react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
  background: none;
  text-align: center;
  line-height: 16px;
}

.react-calendar__tile:disabled {
  background-color: #f0f0f0;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__tile--now {
  background: #ffff76;
}

.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}

.react-calendar__tile--hasActive {
  background: #76baff;
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}

.react-calendar__tile--active {
  background: #006edc;
  color: white;
}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}

.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}
`