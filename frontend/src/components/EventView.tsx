import React from "react"
import styled from "styled-components";
import {Box} from "./Box";
import {Button, Icon, IconName} from "@blueprintjs/core";
import {Event} from "../lib/models/event";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {testCall} from "../lib/api-client";
import {notifySuccess} from "../lib/toaster";
import {useTranslation} from "react-i18next";

interface Props {
    event: Event;
}

const Header = styled.div`
  margin: 0 1em;
  
  display: grid;
  grid-template-columns: min-content auto min-content min-content;
  align-items: center;
`

const Name = styled.h3`
  margin: 1em;
`

const Description = styled.p`
  padding: 0.4em 1em;
`

const UrlView = styled.div`
  padding: 0.4em 1em;
  display: block;
  font-size: 0.9em;
  
  & > code {
    text-decoration: underline;
  }
`

const KeyView = styled.div`
  padding: 0.4em 1em;
  font-size: 0.9em;
`

export const EventView: React.FC<Props> = (props) => {
    const [t] = useTranslation();
    const history = useHistory();
    const {event} = props;

    const editUrl = `/events/${event.id}`;

    const triggerUrl =
        window.location.protocol + '//' +
        window.location.host +
        '/call/' + encodeURIComponent(event.key);

    const handleTestCall = async () => {
        await testCall(event.key);
        notifySuccess(t('notification.testCallMade'))
    }

    return (
        <Box>
            <Header>
                <Icon icon={event.icon as IconName} iconSize={28}/>
                <Name><Link to={editUrl}>{event.name}</Link></Name>
                <Button
                    icon="function"
                    intent="none"
                    minimal
                    onClick={handleTestCall}
                />
                <Button
                    icon="edit"
                    intent="none"
                    minimal
                    onClick={() => history.push(editUrl)}
                />
            </Header>

            {event.description && (
                <Description>
                    {event.description}
                </Description>
            )}

            <KeyView>
                <span>key:</span>&nbsp;
                <strong>{event.key}</strong>
            </KeyView>

            <UrlView>
                <span>link:</span>&nbsp;
                <code>{triggerUrl}</code>
            </UrlView>


        </Box>
    )
}
