import React from "react"
import styled from "styled-components";
import {Event} from "../../lib/models/event";

interface Props {
    eventsList: Event[];
}


export const Row = styled.div`
  padding: 1em;
  margin: 1em -1em;
  
  background: #F5F8FA;
  border-radius: 3px;
`


const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 1em;
`

const Name = styled.h3`
  margin: 1em;
`

const Description = styled.p`
  
`


export const EventsTable: React.FC<Props> = (props) => {
    return (
        <>
            {props.eventsList.map(event => (
                <Row key={event.id}>
                    <Header>
                        <Name>{event.name}</Name>
                        <Description>{event.description}</Description>
                    </Header>
                </Row>
            ))}
        </>
    )
}
