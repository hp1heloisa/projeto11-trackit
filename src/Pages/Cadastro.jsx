import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";

export default function Cadastro(){

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [name,setName] = useState('');
    let [image,setImage] = useState('');
    const navigate = useNavigate()
    

    function fazerCadastro(e){
        e.preventDefault();
        const cadastro = {email,name,image,password};
        console.log(cadastro)
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",cadastro);
        promise.then(resposta => navigate('/'));
        promise.catch(erro => alert(erro.response.data.message));
    }
    
    return(
        <ContainerLogin>
            <div>
                <h1>TrackIt</h1>
            </div>
            <FormEntrada onSubmit={(e) => fazerCadastro(e)}>
                <input type={"email"} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type={"password"} placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type={"text"} placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type={"url"} placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)} required/>
                <button type="submit">Cadastrar</button>
            </FormEntrada>
            <Link to={"/"}>Já tem uma conta? Faça login!</Link>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    h1{
        font-family: 'Playball';
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        color: #126BA5;
    }
    a{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        color: #52B6FF;
        margin-top: 25px;
    }
    div:nth-child(1){
        margin-top: 68px;
        margin-bottom: 33px;
    }
`

const FormEntrada = styled.form`
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
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 19.976px;
        padding-left: 11px;
        ::placeholder{
            color: #DBDBDB;
        }
    }
    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        border: 1px solid #52B6FF;
        color: #FFFFFF;
        font-size: 20.976px;
    }
`
