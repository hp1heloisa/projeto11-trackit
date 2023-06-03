import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";
import TituloCriacao from "../components/TituloCriacao";
import FormCriacao from "../components/FormCriacao";
import { ButtonDia } from "../styled/Styles";

export default function Habitos(){

    const {acesso, setAcesso, setImage} = useContext(ValoresContext);

    let [habitos,setHabitos] = useState([]);
    let [estado, setEstado] = useState('none');
    let [render, setRender] = useState('');
    const dias = ["D","S","T","Q","Q","S","S"];

    useEffect(()=>{
        if (!acesso.headers){
            let dados = localStorage.getItem('dadosUsuario');
            dados = JSON.parse(dados);
            setAcesso({headers: {Authorization: `Bearer ${dados.token}`}});
            setImage(dados.image);
            setRender(1);
        } else{
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',acesso);
            promise.then(resp => {
                setHabitos(resp.data);
            });
            promise.catch(erro => console.log(erro));
        }
    },[render])

    function mudarEstado(e){
        e.preventDefault();
        if (estado == 'none'){
            setEstado('flex');
        } else{
            setEstado('none');
        }
    }

    function deletarHabito(i){
        const answer = confirm('Você tem certeza que deseja deletar esse hábito?');
        console.log(answer);
        if (answer){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}`,acesso);
            promise.then(resp => {
                setRender(resp);
            });
            promise.catch(erro => console.log(erro));
        }
    }

    if (habitos.length==0){
        return(
            <ContainerTudo>
                <TituloCriacao mudarEstado={mudarEstado} />
                <FormCriacao mudarEstado={mudarEstado} setRender={setRender} estado={estado}/>
                <SemHabito>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SemHabito>
            </ContainerTudo>
        )
    } else{
        return(
            <ContainerTudo>
                <TituloCriacao  mudarEstado={mudarEstado}/>
                <FormCriacao mudarEstado={mudarEstado} setRender={setRender} estado={estado}/>
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