import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Menu({estado}){

    const location = useLocation();


    return(
        <DivTopo estado={estado}>
            <Link to='/habitos'><span>Hábitos</span></Link>
            <Link to='/hoje'><div>Hoje</div></Link>
            <Link to='/historico'><span>Histórico</span></Link>
        </DivTopo>
    )
}

const DivTopo = styled.div`
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
    span{
        color: #52B6FF;
    }
    div {
        width: 91px;
        height: 91px;
        background: #52B6FF;
        color: #FFFFFF;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;        
    }
    a{
        text-decoration:none;
    }
`