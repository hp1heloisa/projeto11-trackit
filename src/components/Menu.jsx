import styled from "styled-components";
import { Link } from "react-router-dom";
import ProgressBarComponent from "./ProgressBar";
    

export default function Menu({estado}){
  
    return(
        <DivMenu  data-test="menu" estado={estado}>
            <Link data-test="habit-link" to='/habitos'><span>Hábitos</span></Link>
            <Link data-test="today-link" to='/hoje'><ProgressBarComponent /></Link>
            <Link data-test="history-link" to='/historico'><span>Histórico</span></Link>
        </DivMenu>
    )
}

const DivMenu = styled.div`
    display: ${props => props.estado};
    box-sizing: border-box;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    justify-content: space-between;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    z-index: 10;
    span{
        color: #52B6FF;
    }
    div {
        box-sizing: border-box;
        width: 91px;
        height: 91px;
        background: #52B6FF;
        border-radius: 100%;
        display: flex;
        margin-bottom: 50px;
        align-items: center;     
        justify-content: center;
        padding: 5px;  
    }
    a{
        text-decoration:none;
    }
`
