import React, { createContext, useState } from "react";

// Crie o contexto
export const ValoresContext = createContext();

// Crie o provedor do contexto
export const ValoresContextProvider = ({ children }) => {
  const [porcentagem, setPorcentagem] = useState(0);
  const [image, setImage] = useState('');
  const [acesso, setAcesso] = useState({});

  return (
    <ValoresContext.Provider value={{ porcentagem, setPorcentagem, image, setImage, acesso, setAcesso }}>
      {children}
    </ValoresContext.Provider>
  );
};
