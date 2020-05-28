import React from "react"
import {useTranslation} from "react-i18next";
import {useEventsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {Placeholder} from "../components/Placeholder";
import {EventsTable} from "./eventsPage/EventsTable";


const SecretsPage: React.FC = () => {
    const [t] = useTranslation();

    const {
        loading,
        result: eventsList,
    } = useEventsList(0, [])

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    return (
        <>
            <Heading>{t('heading.events')}</Heading>

            {eventsList.length === 0 ? (
                <Placeholder
                    title={t('placeholder.noEvents.title')}
                />
            ) : (
                <EventsTable
                    eventsList={eventsList}
                />
            )}
        </>
    )
};

export default SecretsPage;
