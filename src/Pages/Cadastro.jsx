import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import LoadEntrar from "../components/LoadEntrar";
import Logo from "../components/Logo";
import { ContainerInicial, FormEntrada } from "../styled/Styles";

export default function Cadastro(){

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [name,setName] = useState('');
    let [image,setImage] = useState('');
    let [habilita, setHabilita] = useState(false);
    const navigate = useNavigate()

    function fazerCadastro(e){
        e.preventDefault();
        const cadastro = {email,name,image,password};
        setHabilita(true);
        console.log(cadastro)
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",cadastro);
        promise.then(resposta => navigate('/'));
        promise.catch(erro => {
            alert(erro.response.data.message);
            setHabilita(false);
        });
    }
    
    return(
        <ContainerInicial>
            <Logo />
            <FormEntrada habilita={habilita} onSubmit={(e) => fazerCadastro(e)}>
                <input data-test="email-input" type={"email"} placeholder="email" value={email} disabled={habilita} onChange={(e) => setEmail(e.target.value)} required/>
                <input data-test="password-input" type={"password"} placeholder="senha" value={password} disabled={habilita} onChange={(e) => setPassword(e.target.value)} required/>
                <input data-test="user-name-input" type={"text"} placeholder="nome" value={name} disabled={habilita} onChange={(e) => setName(e.target.value)} required/>
                <input data-test="user-image-input" type={"url"} placeholder="foto" value={image} disabled={habilita} onChange={(e) => setImage(e.target.value)} required/>
                <button data-test="signup-btn" disabled={habilita} type="submit"><LoadEntrar habilita={habilita} /></button>
            </FormEntrada>
            <Link data-test="login-link" to={"/"}>Já tem uma conta? Faça login!</Link>
        </ContainerInicial>
    )
}

