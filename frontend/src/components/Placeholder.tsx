import React from "react"
import styled from "styled-components";

interface Props {
    title?: string;
    description?: string;

    actionTitle?: string;
    onAction?: () => void;
}

const Wrapper = styled.div`
  margin: 1em 0;
  //text-align: center;
`

const Title = styled.h3`
  color: #8A9BA8;
`

const Description = styled.p`
  color: #A7B6C2;
`

export const Placeholder:React.FC<Props> = (props) => {
    return (
        <Wrapper>
            {props.title && <Title>{props.title}</Title>}
            {props.description && <Description>{props.description}</Description>}
        </Wrapper>
    )
};
