import styled from "styled-components"

export default function TituloCriacao({mudarEstado}) {

    return(
        <ContainerCriacao>
            <span>Meus hábitos</span>
            <div data-test="habit-create-btn" onClick={mudarEstado}>+</div>
        </ContainerCriacao>
    )
}

const ContainerCriacao = styled.div`
    margin-top: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    span{     
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    div{
        font-size: 26.976px;
        color: #FFFFFF;
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        text-align: center;
        line-height: 34px;
    } 
`