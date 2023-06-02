import styled from 'styled-components';
import logo from '../assets/logo.png';

export default function Logo(){
    return(
        <DivLogo>
                <img src={logo} />
                <h1>TrackIt</h1>
        </DivLogo>
    )
}

const DivLogo = styled.div` 
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
`