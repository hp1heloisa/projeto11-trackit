import { CircularProgressbar } from "react-circular-progressbar";
import styled from "styled-components";
import { useContext } from "react";
import { ValoresContext } from "../arquivoContext";

export default function ProgressBarComponent() { 
   
  const {porcentagem} = useContext(ValoresContext);

    return (
      <div>
        <StyledProgressBar value={porcentagem} text={"Hoje"} />
      </div>
    )
  }

const StyledProgressBar = styled(CircularProgressbar)`
  .CircularProgressbar-path {
    stroke: #FFFFFF; 
    stroke-linecap: round;
    stroke-width: 7px; 
  }
  .CircularProgressbar-text {
    fill: #FFFFFF; 
    text-anchor: middle;
    dominant-baseline: middle;
    transform: none;
  }
  .CircularProgressbar-trail {
    stroke: #52B6FF;
  }
`;