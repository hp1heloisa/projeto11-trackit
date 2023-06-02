import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ValoresContext } from "../arquivoContext";
import LoadEntrar from "../components/LoadEntrar";
import { ButtonDia } from "../styled/Styles";

export default function FormCriacao({mudarEstado, setRender, estado}) {

    const {acesso} = useContext(ValoresContext);
    let [habilita, setHabilita] = useState(false);
    let [name,setName] = useState('');
    let [days,setDays] = useState([]);
    const dias = ["D","S","T","Q","Q","S","S"];

    function escolherDia(i){ 
        if (!days.includes(i)){
            setDays([...days,i]);
        } else{
            let novo = days.filter(dia=>{
                if (dia!=i){
                    return dia;
                }
            });
            setDays(novo);
        }
        console.log(days);
    }

    function criarHabito(e){
        e.preventDefault();
        const criar = {name,days};
        setHabilita(true);
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',criar,acesso);
        promise.then(resp =>{ 
            setRender(resp);
            mudarEstado(e);
            setName('');
            setDays([]);
            setHabilita(false);
        });
        promise.catch(erro => {
            alert(erro.response.data.message);
            setHabilita(false);
        });
        console.log(criar);
    }

    return(
        <FormCriar data-test="habit-create-container" habilita={habilita} estado={estado} onSubmit={criarHabito}>
                        <input data-test="habit-name-input" type={"text"} placeholder={"nome do hábito"} value={name} disabled={habilita} onChange={e => setName(e.target.value)}/>
                        <div>
                            {dias.map((dia,i) => <ButtonDia key={i} data-test="habit-day" type="button" disabled={habilita} cor={days.includes(i)} onClick={()=>escolherDia(i)}>{dia}</ButtonDia>)}
                        </div>
                        <div>
                            <button data-test="habit-create-cancel-btn" disabled={habilita} type="button" onClick={mudarEstado}>Cancelar</button>
                            <button data-test="habit-create-save-btn" disabled={habilita} type="submit"><LoadEntrar habilita={habilita}/></button>
                        </div>
        </FormCriar>
    )
}

const FormCriar = styled.form`
    display: ${props => props.estado};
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    flex-direction: column;
    align-items: center;
    padding-top:18px;
    padding-right: 16px;
    padding-left: 16px;
    margin-bottom: 29px;
    input{
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        background: ${props => (props.habilita) ? "#F2F2F2" : "#FFFFFF"};
        color: ${props => (props.habilita) ? "#B3B3B3" : ""};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        ::placeholder{
            color: #DBDBDB;
        }
    }
    > div:nth-child(2){
        display:flex;
        align-items: center;
        width: 100%;
        gap: 4px;
        margin-top: 10px;
    }
    > div:nth-child(3){
        width: 100%;
        display: flex;
        gap: 23px;
        justify-content: end;
        margin-top: 29px;
        button{
            font-family: 'Lexend Deca';
            font-weight: 400;
            font-size: 15.976px;
            line-height: 20px;
            text-align: center;
            opacity: ${props => (props.habilita) ? "0.7" : ""};
        }
        > button:nth-child(1){
            color: #52B6FF;
            border: none;
            background: none;
        }
        > button:nth-child(2){
            color: #FFFFFF;
            width: 84px;
            height: 35px;
            background: #52B6FF;
            border: none;
            border-radius: 4.63636px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
`
