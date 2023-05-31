import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Topo({image, estado, setEstado}){

    const location = useLocation();

    useEffect(()=>{
        if (location.pathname != '/' && location.pathname != '/cadastro'){
            setEstado('flex');
        } else{
            setEstado('none');
        }
    })

    return(
        <DivTopo estado={estado}>
            <span>TrackIt</span>
            <img src={image}/>
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
    }
`