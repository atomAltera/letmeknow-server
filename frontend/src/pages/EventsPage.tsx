import React from "react"
import {useTranslation} from "react-i18next";
import {RouterProps, withRouter} from "react-router";
import {useEventsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {NoDataPage} from "../components/NoDataPage";
import {Event} from "../lib/models/event";
import {EventView} from "../components/EventView";


const SecretsPage: React.FC<RouterProps> = (props) => {
    const [t] = useTranslation();

    const {
        loading,
        result: eventsList,
    } = useEventsList(0, [] as Event[])

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    if (eventsList.length === 0) {
        return (
            <NoDataPage
                title={t('heading.events')}
                placeholderTitle={t('placeholder.noEvents.title')}
            />
        )
    }

    const handleEditClick = (eventId: string) => {
        props.history.push(`/events/${eventId}`)
    }

    return (
        <>
            <Heading>{t('heading.events')}</Heading>

            {eventsList.map(event => (
                <EventView
                    event={event}

                    onEditClick={() => handleEditClick(event.id)}
                />
            ))}
        </>
    )
};

export default withRouter(SecretsPage);
