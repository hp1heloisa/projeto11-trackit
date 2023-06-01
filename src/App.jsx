import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Topo from "./components/Topo";
import Menu from "./components/Menu";
import Cadastro from "./Pages/Cadastro";
import Habitos from "./Pages/Habitos";
import Hoje from "./Pages/Hoje";
import Historico from "./Pages/Historico";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";


export default function App() {
  axios.defaults.headers.common['Authorization'] = '4aM0zdek9vylJloFhgNLtldy';

  let [estado,setEstado] = useState('none');
  let [image, setImage] = useState('');
  let [acesso,setAcesso] = useState({});
  let [porcentagem, setPorcentagem] = useState(0);
  
  return (
      <BrowserRouter>
       <Tudo estado={estado}>
      <Topo estado={estado} image={image} setEstado={setEstado}/>
      <Routes>
        <Route path='/' element={<Login setImage={setImage} setAcesso={setAcesso} />} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/habitos' element={<Habitos acesso={acesso}/>} />
        <Route path='/hoje' element={<Hoje acesso={acesso} setPorcentagem={setPorcentagem}/>} />
        <Route path='/historico' element={<Historico acesso={acesso}/>} />
      </Routes>
      <Menu estado={estado} porcentagem={porcentagem} />
      </Tudo>
    </BrowserRouter>
  )
}

const Tudo = styled.div`
    margin-top: ${props => {if (props.estado == 'flex') return '70px'}};
    margin-bottom: ${props => {if (props.estado == 'flex') return '70px'}};
    background-color: ${props => {if (props.estado == 'flex') return '#EBEBEB'}};
    min-height: 100vh;
    padding-bottom: ${props => {if (props.estado == 'flex') return '50px'}};;
  html, body, #root {
    height: 100%;
  }
`


