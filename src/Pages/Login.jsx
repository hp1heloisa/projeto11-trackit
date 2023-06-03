import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ValoresContext } from "../arquivoContext";
import LoadEntrar from "../components/LoadEntrar";
import Logo from "../components/Logo";
import { FormEntrada, ContainerInicial } from "../styled/Styles";

export default function Login(){


    const {setImage, setAcesso, acesso} = useContext(ValoresContext);

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [habilita, setHabilita] = useState(false);
    const navigate = useNavigate();    

    useEffect(()=>{
        let dados = localStorage.getItem('dadosUsuario');
        dados = JSON.parse(dados);
        if (dados) {
            setEmail(dados.email);
            setPassword(dados.password);
        }
    },[])

    function fazerLogin(e){
        e.preventDefault();
        const login = {email, password};
        setHabilita(true);
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', login);
        promise.then(resp => {
            setImage(resp.data.image);
            setAcesso({headers: {Authorization: `Bearer ${resp.data.token}`}});
            localStorage.setItem('dadosUsuario',JSON.stringify({email, password, token:resp.data.token, image: resp.data.image}));
            navigate('/hoje');
        });
        promise.catch(erro => {
            alert(erro.response.data.message);
            setHabilita(false);
        });
    }

    return(
        <ContainerInicial>
            <Logo />
            <FormEntrada habilita={habilita} onSubmit={e => fazerLogin(e)}>
                <input data-test="email-input" type={"email"} placeholder="email" value={email} disabled={habilita} onChange={e => setEmail(e.target.value)} />
                <input data-test="password-input" type={"password"} placeholder="senha" value={password} disabled={habilita} onChange={e => setPassword(e.target.value)} />
                <button data-test="login-btn" disabled={habilita} type="submit"><LoadEntrar habilita={habilita} /></button>
            </FormEntrada>
            <Link  data-test="signup-link" to={"/cadastro"}>Não tem uma conta? Cadastre-se!</Link>
        </ContainerInicial>
    )
}