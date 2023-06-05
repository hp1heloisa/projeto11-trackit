import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";
    
export default function Topo({estado, setEstado}){

    const {image} = useContext(ValoresContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if (location.pathname != '/' && location.pathname != '/cadastro'){
            setEstado('flex');
        } else{
            setEstado('none');
        }
    })

    function sair(){
        const sair = confirm('Gostaria de sair?');
        if (sair) {
            localStorage.removeItem("dadosUsuario");
            navigate('/');
        }
    }

    return(
        <DivTopo data-test="header" estado={estado}>
            <span>TrackIt</span>
            <img data-test="avatar" src={image} onClick={sair} />
        </DivTopo>
    )
}

const DivTopo = styled.div`
    display: ${props => props.estado};
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 70px;   
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    span{
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
        margin-left: 18px;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 100%;
        margin-right: 10px;
        cursor: pointer;
    }
`