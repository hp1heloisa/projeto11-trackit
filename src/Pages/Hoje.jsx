import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";
import dayjs from "dayjs";


export default function Hoje(){
    
    const {setPorcentagem, acesso, setAcesso, setImage} = useContext(ValoresContext);
    let [habitos, setHabitos] = useState([]);
    let [quantidade, setQuantidade] = useState(0);
    let [render, setRender] = useState('');
    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const hoje = dayjs();

    useEffect(()=>{
        if (!acesso.headers){
            let dados = localStorage.getItem('dadosUsuario');
            dados = JSON.parse(dados);
            setAcesso({headers: {Authorization: `Bearer ${dados.token}`}});
            setImage(dados.image);
            setRender(1);
        } else{
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',acesso);
            promise.then(resp => {
            setHabitos(resp.data);
            let conta = 0;
            resp.data.map(habito => {
                if (habito.done){
                    conta++;
                }
            });
            setQuantidade(conta);
            });
            promise.catch(erro => console.log(erro));
        }
    },[render])

    function marcarHabito(id, done){
        if (done) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{},acesso);
            promise.then(resp => {
                console.log(resp);
                setRender(resp);
            });
            promise.catch(erro => console.log(erro));
        } else {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{},acesso);
            promise.then(resp => {
                console.log(resp);
                setRender(resp);
            });
            promise.catch(erro => console.log(erro));
        }
    }

    function HabConcluidos(){
        if (quantidade==0){
            return(<h2 data-test="today-counter">Nenhum hábito concluído ainda</h2>)
        } else{
            return(<h2 data-test="today-counter">{`${((quantidade*100)/habitos.length).toFixed(0)}% dos hábitos concluídos`}</h2>)
        }
    }

    function QuantDias({quant}){
        if (quant == 1){
            return '1 dia';
        } else {
            return (quant + ' dias');
        }
    }

    if (habitos.length>0){
        setPorcentagem((quantidade*100)/habitos.length);
    }
    
    return(
        <DivHoje quantidade={quantidade}>
            <div>
                <h1 data-test="today">{`${dias[hoje.format('d')]}, ${hoje.format('DD/MM')}`}</h1>
                <HabConcluidos />
            </div>
            <ContainerHabitosDia>
                {habitos.map(habito =>{
                    return(
                        <HabitoDia  data-test="today-habit-container" done={habito.done} atual={habito.currentSequence} maior={habito.highestSequence} key={habito.id}>
                            <div>
                                <span data-test="today-habit-name">{habito.name}</span>
                                <div>
                                    <p data-test="today-habit-sequence">Sequência atual: <span><QuantDias quant={habito.currentSequence}/></span></p>
                                    <p data-test="today-habit-record">Seu recorde: <span><QuantDias quant={habito.highestSequence}/></span></p>
                                </div>
                            </div>
                            <ion-icon data-test="today-habit-check-btn" name="checkbox" onClick={() => marcarHabito(habito.id, habito.done)}></ion-icon>
                        </HabitoDia>
                    )
                    } )}
            </ContainerHabitosDia>
        </DivHoje>
    )
}


const DivHoje = styled.div`
    box-sizing: border-box;
    padding-top: 28px;
    padding-left: 18px;
    padding-right: 18px;
    width: 100%;
    font-family: 'Lexend Deca';
    font-weight: 400;
    h1{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h2{
        font-size: 17.976px;
        line-height: 22px;
        color: ${props => (props.quantidade > 0) ? '#8FC549' : '#BABABA'};
    }
    > div:nth-child(1) {
        margin-bottom: 28px;
    }
`
const ContainerHabitosDia = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`
const HabitoDia = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 13px;
    > div{
        display: flex;
        flex-direction: column;
        gap: 7px;
        color: #666666;
        p{
            font-size: 12.976px;
            line-height: 16px;
        }
        > span{
            font-size: 19.976px;
            line-height: 25px;
        }
        >div > p:nth-child(1){
                span{
                    color: ${props => (props.done) ? '#8FC549' : ''};
                }
        }
        >div > p:nth-child(2){
                span{
                    color: ${props => (props.atual == props.maior && props.done) ? '#8FC549' : ''};;
                }
        }
    }
    ion-icon{
        color: ${props => (props.done) ? '#8FC549' : '#E7E7E7'};
        width: 69px;
        height: 69px;
        cursor: pointer;
    }
`