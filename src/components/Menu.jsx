import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";
    

export default function Menu({estado}){
  
    const {porcentagem} = useContext(ValoresContext);

    console.log(porcentagem);

    const ProgressBarComponent = () => {  
    return (
      <div>
        <StyledProgressBar value={porcentagem} text={"Hoje"} />
      </div>
    );
  };

    return(
        <DivMenu  data-test="menu" estado={estado}>
            <Link data-test="habit-link" to='/habitos'><span>Hábitos</span></Link>
            <Link data-test="today-link" to='/hoje'><ProgressBarComponent/></Link>
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

const StyledProgressBar = styled(CircularProgressbar)`
  .CircularProgressbar-path {
    stroke: #FFFFFF; /* Cor da barra de progresso */
    stroke-linecap: round;
    stroke-width: 7px; 
  }
  .CircularProgressbar-text {
    fill: #FFFFFF; /* Cor do texto (porcentagem) */
    text-anchor: middle;
    dominant-baseline: middle;
    transform: none;
  }
  .CircularProgressbar-trail {
    stroke: #52B6FF; /* Cor do trilho da barra de progresso */
  }
`;