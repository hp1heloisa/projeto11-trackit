import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";

export default function Habitos(){

    const {acesso} = useContext(ValoresContext);

    let [habitos,setHabitos] = useState([]);
    let [habilita, setHabilita] = useState(false);
    let [estado, setEstado] = useState('none');
    let [days,setDays] = useState([]);
    let [name,setName] = useState('');
    const dias = ["D","S","T","Q","Q","S","S"];
    const navigate = useNavigate();
    let [render, setRender] = useState('');

    useEffect(()=>{
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',acesso);
        promise.then(resp => {
            setHabitos(resp.data);
            console.log(habitos);
            console.log(resp);
        });
        promise.catch(erro => console.log(erro));
    },[render])

    function mudarEstado(e){
        e.preventDefault();
        if (estado == 'none'){
            setEstado('flex');
        } else{
            setEstado('none');
        }
    }

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

    function deletarHabito(i){
        const answer = confirm('Você tem certeza que deseja deletar esse hábito?');
        console.log(answer);
        if (answer){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}`,acesso);
            promise.then(resp => {
                console.log(resp)
                setRender(resp);
            });
            promise.catch(erro => console.log(erro));
        }
    }


    if (habitos.length==0){
        return(
            <ContainerTudo>
                <ContainerCriacao>
                    <span>Meus hábitos</span>
                    <div data-test="habit-create-btn" onClick={mudarEstado}>+</div>
                </ContainerCriacao>
                <FormCriar data-test="habit-create-container" habilita={habilita} estado={estado} onSubmit={criarHabito}>
                        <input data-test="habit-name-input" type={"text"} placeholder={"nome do hábito"} value={name} disabled={habilita} onChange={e => setName(e.target.value)}/>
                        <div>
                            {dias.map((dia,i) => <ButtonDia key={i} data-test="habit-day" type="button" disabled={habilita} cor={days.includes(i)} onClick={()=>escolherDia(i)}>{dia}</ButtonDia>)}
                        </div>
                        <div>
                            <button data-test="habit-create-cancel-btn" disabled={habilita} type="button" onClick={mudarEstado}>Cancelar</button>
                            <button data-test="habit-create-save-btn" disabled={habilita} type="submit">Salvar</button>
                        </div>
                </FormCriar>
                <SemHabito>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SemHabito>
            </ContainerTudo>
        )
    } else{
        return(
            <ContainerTudo>
                <ContainerCriacao>
                    <span>Meus hábitos</span>
                    <div data-test="habit-create-btn" onClick={mudarEstado}>+</div>
                </ContainerCriacao>
                <FormCriar data-test="habit-create-container" habilita={habilita} estado={estado} onSubmit={criarHabito}>
                        <input data-test="habit-name-input" disabled={habilita} type={"text"} placeholder={"nome do hábito"} value={name} onChange={e => setName(e.target.value)}/>
                        <div>
                            {dias.map((dia,i) => <ButtonDia key={i} data-test="habit-day" disabled={habilita} type="button" cor={days.includes(i)} onClick={()=>escolherDia(i)}>{dia}</ButtonDia>)}
                        </div>
                        <div>
                            <button data-test="habit-create-cancel-btn" disabled={habilita} type="button" onClick={mudarEstado}>Cancelar</button>
                            <button data-test="habit-create-save-btn" disabled={habilita} type="submit">Salvar</button>
                        </div>
                </FormCriar>
                <HabitosCriados>
                    {habitos.map(habito => {
                       return (
                       <HabitoCriado data-test="habit-container" key={habito.id}>
                            <div>
                                <span data-test="habit-name">{habito.name}</span>
                                <ion-icon data-test="habit-delete-btn" name="trash-outline" onClick={() => deletarHabito(habito.id)}></ion-icon>
                            </div>
                            <div>
                                {dias.map((dia,i) => {
                                    if (habito.days.includes(i)){
                                        return (<ButtonDia key={i} data-test="habit-day" cor={true} disabled>{dia}</ButtonDia>)
                                    } else{
                                        return (<ButtonDia key={i} data-test="habit-day" cor={false} disabled>{dia}</ButtonDia>)
                                    }
                                })}
                            </div>
                        </HabitoCriado>)
                    })}
                </HabitosCriados>
            </ContainerTudo>
        )
    }
}

const ContainerTudo = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: 'Lexend Deca';
    font-weight: 400;
    padding-left: 18px;
    padding-right: 18px;
`

const ContainerCriacao = styled.div`
    margin-top: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    span{     
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    div{
        font-size: 26.976px;
        color: #FFFFFF;
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        text-align: center;
        line-height: 34px;
    }
    
`


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
        }
    }
    
`

const SemHabito = styled.div`
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`

const HabitosCriados = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const HabitoCriado = styled.div`
        box-sizing: border-box;
        width: 100%;
        height: 91px;
        background-color: #FFFFFF;
        border-radius: 5px; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 8px;
        padding-left: 14px;
        padding-right: 10px;
        > div:first-child{
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        > div:nth-child(2){
            display: flex;
            gap: 4px;
        }
`

const ButtonDia = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.cor ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid ${props => props.cor ? '#CFCFCF' : '#D5D5D5'};
    color: ${props => props.cor ? '#FFFFFF' : '#DBDBDB'};
    display: flex;
    justify-content: center;
    align-items: center;
`