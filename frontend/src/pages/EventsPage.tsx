import React from "react"
import {useTranslation} from "react-i18next";
import {RouterProps, withRouter} from "react-router";
import {useEventsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {NoDataView} from "../components/NoDataView";
import {Event} from "../lib/models/event";
import {EventView} from "../components/EventView";


const SecretsPage: React.FC<RouterProps> = (props) => {
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
                    key={event.id}
                    event={event}

                    onEditClick={() => handleEditClick(event.id)}
                />
            ))}
        </>
    )
};

export default withRouter(SecretsPage);
