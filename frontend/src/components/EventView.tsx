import React from "react"
import styled from "styled-components";
import {Box} from "./Box";
import {Button} from "@blueprintjs/core";
import {Event} from "../lib/models/event";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

interface Props {
    event: Event;
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
    const history = useHistory();
    const {event} = props;

    const editUrl = `/events/${event.id}`;

    return (
        <Box>
            <Header>
                <Name><Link to={editUrl}>{event.name}</Link></Name>
                <Button
                    icon="edit"
                    intent="none"
                    onClick={() => history.push(editUrl)}
                />
            </Header>
        </Box>
    )
}
