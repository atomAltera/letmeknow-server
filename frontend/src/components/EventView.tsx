import React from "react"
import styled from "styled-components";
import {Box} from "./Box";
import {Button} from "@blueprintjs/core";
import {Event} from "../lib/models/event";

interface Props {
    event: Event;

    onEditClick?: () => void;
}

const Header = styled.div`
  margin: 0 1em;
  
  display: grid;
  grid-template-columns: auto min-content;
  align-items: center;
`

const Name = styled.h3`
  margin: 1em;
`

export const EventView: React.FC<Props> = (props) => {
    const {event} = props;

    return (
        <Box>
            <Header>
                <Name>{event.name}</Name>
                <Button
                    icon="edit"
                    intent="none"
                    onClick={props.onEditClick}
                />
            </Header>
        </Box>
    )
}
