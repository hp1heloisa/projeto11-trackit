import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import logo from '../assets/logo.png';

export default function Login({setImage, setAcesso}){

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    const navigate = useNavigate();

    function fazerLogin(e){
        e.preventDefault();
        const login = {email, password};
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', login);
        promise.then(resp => {
            console.log(resp)
            setImage(resp.data.image);
            setAcesso({headers: {Authorization: `Bearer ${resp.data.token}`}});
            navigate('/hoje');
        });
        promise.catch(erro => alert(erro.response.data.message));
    }

    return(
        <ContainerLogin>
            <div>
                <img src={logo} />
                <h1>TrackIt</h1>
            </div>
            <FormEntrada onSubmit={e => fazerLogin(e)}>
                <input type={"email"} placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type={"password"} placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Entrar</button>
            </FormEntrada>
            <Link to={"/cadastro"}>Não tem uma conta? Cadastre-se!</Link>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
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
    div{
        margin-top: 68px;
        margin-bottom: 33px;
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        h1{
            font-family: 'Playball';
            font-weight: 400;
            font-size: 68.982px;
            line-height: 86px;
            color: #126BA5;
        }
        img{
            width: 154.94px;
        }
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
        width: 318px;
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        border: 1px solid #52B6FF;
        color: #FFFFFF;
        font-size: 20.976px;
    }
`
