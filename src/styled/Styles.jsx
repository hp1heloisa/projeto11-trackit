import styled from "styled-components";

export const ButtonDia = styled.button`
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

export const Tudo = styled.div`
margin-top: ${props => {if (props.estado == 'flex') return '70px'}};
margin-bottom: ${props => {if (props.estado == 'flex') return '70px'}};
background-color: ${props => {if (props.estado == 'flex') return '#EBEBEB'}};
min-height: 100vh;
padding-bottom: ${props => {if (props.estado == 'flex') return '50px'}};;
html, body, #root {
height: 100%;
}
`

export const FormEntrada = styled.form`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Lexend Deca';
font-weight: 400;
line-height: 26px;
gap: 6px;
input{
    width: 303px;
    height: 45px;
    background: ${props => (props.habilita) ? "#F2F2F2" : "#FFFFFF"};
    color: ${props => (props.habilita) ? "#AFAFAF" : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 19.976px;
    padding-left: 11px;
    ::placeholder{
        color: #DBDBDB;
    }
}
button{
    box-sizing: border-box;
    width: 318px;
    height: 45px;
    background: #52B6FF;
    border-radius: 5px;
    border: 1px solid #52B6FF;
    color: #FFFFFF;
    font-size: 20.976px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.habilita) ? "0.7" : ""};
    cursor: ${props => (props.habilita) ? "not-allowed" : "pointer"};
}
`

export const ContainerInicial = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
align-items: center;
a{
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    color: #52B6FF;
    margin-top: 25px;
}
`