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
  let [image, setImage] = useState('')
  
  return (
    <Tudo estado={estado}>
      <BrowserRouter>
      <Topo estado={estado} image={image} setEstado={setEstado}/>
      <Routes>
        <Route path='/' element={<Login setImage={setImage} />} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/habitos' element={<Habitos/>} />
        <Route path='/hoje' element={<Hoje/>} />
        <Route path='/historico' element={<Historico/>} />
      </Routes>
      <Menu estado={estado} />
    </BrowserRouter>
    </Tudo>
  )
}

const Tudo = styled.div`
    margin-top: ${props => {if (props.estado == 'flex') return '70px'}};
    margin-bottom: ${props => {if (props.estado == 'flex') return '70px'}};
    background-color: ${props => {if (props.estado == 'flex') return '#EBEBEB'}};
    height: 100%;
`

