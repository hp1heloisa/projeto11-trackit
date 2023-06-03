import { useContext, useEffect, useState } from "react";
import { ValoresContext } from "../arquivoContext";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components"

export default function Historico(){
    const {acesso, setAcesso, setImage} = useContext(ValoresContext);
    let [render, setRender] = useState('');
    let [habitosDias, setHabitosDias] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    let [renderizar, setRenderizar] = useState([]);
    
    useEffect(()=>{
        if (!acesso.headers){
            let dados = localStorage.getItem('dadosUsuario');
            dados = JSON.parse(dados);
            setAcesso({headers: {Authorization: `Bearer ${dados.token}`}});
            setImage(dados.image);
            setRender(1);
        } else{
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily',acesso);
            promise.then(resp => setHabitosDias(resp.data));
            promise.catch(erro => console.log(erro));
        }
    },[render]);

    let dias = habitosDias.map(dia => dia.day.split('/').map(elemento => parseInt(elemento)).join('/'));
    let faltantes = [];
    habitosDias.map(dia => {
        let habitosDoDia = dia.habits;
        for (let i=0; i<habitosDoDia.length; i++){
            if (habitosDoDia[i].done==false){
                faltantes.push(dia.day.split('/').map(elemento => parseInt(elemento)).join('/'));
                break;
            }
        }    
    });

    function mostrarHabito(date){
        let diaClicado = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
        if (dias.includes(diaClicado)){
            let habitosDoDia = [];
            for (let i=0; i<habitosDias[dias.indexOf(diaClicado)].habits.length;i++){
                let add = {nome: habitosDias[dias.indexOf(diaClicado)].habits[i].name, done: habitosDias[dias.indexOf(diaClicado)].habits[i].done};
                habitosDoDia.push(add);
            }
            setRenderizar(habitosDoDia);
        } else {
            setRenderizar([]);
        }
    }

    function HabitosDiaClicado(){
        if (renderizar.length!=0){
            return(
                <StyledHabito>
                    <div>
                        <h1>Os seus hábitos nesse dia foram:</h1>
                        <ion-icon name="close" onClick={()=>setRenderizar([])}></ion-icon>
                    </div>
                    <div>
                        {renderizar.map((habito, i) => {
                            if (habito.done){
                                return <p key={i}>{habito.nome} <span className="check"><ion-icon name="checkmark-circle"></ion-icon></span></p>
                            } else{
                                return <p key={i}>{habito.nome} <span className="not"><ion-icon name="close-circle"></ion-icon></span></p>
                            }
                        })}
                    </div>
                </StyledHabito>
            )
        }
    }

    return(
        <HeaderHistorico>
            <h1>Histórico</h1>
            <HabitosDiaClicado />
            <StyledCalendar data-test="calendar" value={selectedDate} onChange={setSelectedDate}
              onClickDay={mostrarHabito} tileClassName={({ date }) => { 
                if (faltantes.includes(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()) && dias.includes(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())) {  
                    return 'faltouCoisa'
                } else if (!faltantes.includes(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()) && dias.includes(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())){
                    return 'tudoFeito'
                }
                }} />
        </HeaderHistorico>
    )
}

const HeaderHistorico = styled.div`
    box-sizing: border-box;
    font-family: 'Lexend Deca';
    font-weight: 400;
    padding-left: 17px;
    padding-right: 17px;
    padding-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    h1{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`

const StyledCalendar = styled(Calendar)`
    width: 100%;
    border-radius: 10px;
    border: none;
    .faltouCoisa {
        background-color: #e22424b8;
        color: black;
        border-radius: 100%;
    }
    .tudoFeito {
        background-color: #369236;
        color: black;
        border-radius: 100%;
    }
    .react-calendar__tile--active {
        border-radius: 100%;
    }
`
const StyledHabito = styled.div`
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-radius: 5px; 
    font-family: 'Lexend Deca';
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 15px;
    margin: auto;
    width: 100%;
    > div:nth-child(1){
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 25px;
        line-height: 25px;
        h1{
            font-size: 19px;
            line-height: 25px;
        }
    }
    p{
        font-size: 15px;
        line-height: 16px;
    }
    .check{
        color: #8FC549;
    }
    .not{
        color: #E75766;
    }
`
