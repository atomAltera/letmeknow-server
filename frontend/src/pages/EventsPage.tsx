import React from "react"
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router";
import {useEventsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {NoDataView} from "../components/NoDataView";
import {Event} from "../lib/models/event";
import {EventView} from "../components/EventView";
import {Button} from "@blueprintjs/core";
import styled from "styled-components";

const Actions = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const EventsPage: React.FC = () => {
    const history = useHistory();
    const [t] = useTranslation();

    const {
        loading,
        result: eventsList,
    } = useEventsList({def: [] as Event[]})

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    if (eventsList.length === 0) {
        return (
            <NoDataView
                title={t('heading.events')}
                placeholderTitle={t('placeholder.noEvents.title')}
                createLinkHref={'/events/new'}
                createLinkTitle={t('action.createEvent')}
            />
        )
    }

    return (
        <>
            <Heading>{t('heading.events')}</Heading>

            {eventsList.map(event => (
                <EventView
                    key={event.id}
                    event={event}
                />
            ))}

            <Actions>
                <Button
                    intent="primary"
                    icon="plus"
                    onClick={() => history.push(`/events/new`)}
                    large
                >{t('action.createEvent')}</Button>
            </Actions>
        </>
    )
};

export default EventsPage;
