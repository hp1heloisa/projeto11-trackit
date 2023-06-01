import styled from "styled-components"

export default function Historico(){
    return(
        <HeaderHistorico>
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </HeaderHistorico>
    )
}

const HeaderHistorico = styled.div`
    box-sizing: border-box;
    font-family: 'Lexend Deca';
    font-weight: 400;
    padding-left: 17px;
    padding-top: 28px;
    h1{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    p{
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-top: 17px;
    }
`