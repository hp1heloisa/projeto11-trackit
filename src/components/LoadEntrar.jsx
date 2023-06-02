import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
  
export default function LoadEntrar({habilita}){
    
    const location = useLocation();

    if (habilita) {
        return <ThreeDots height="13" width="50" radius="9" color="#FFFFFF" ariaLabel="three-dots-loading"  wrapperStyle={{}} wrapperClassName="" visible={true} />;
    } else if (location.pathname == '/'){
        return 'Entrar';
    } else if (location.pathname == '/cadastro'){
        return 'Cadastrar';
    } else {
        return 'Salvar';
    }
}