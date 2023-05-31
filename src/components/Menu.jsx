import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Menu({estado}){

    const location = useLocation();


    return(
        <DivTopo estado={estado}>
            topo
        </DivTopo>
    )
}

const DivTopo = styled.div`
    display: ${props => props.estado};
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
`