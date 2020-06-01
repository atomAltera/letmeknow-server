import React, {useState} from "react"
import {useHistory, useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {useEvent, useSecretsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {
    eventSchema,
    Event_Errors,
    Event_Form
} from "../lib/models/event";
import {EventForm} from "../components/forms/EventForm";
import {deleteEvent, updateEvent} from "../lib/api-client";
import {ErrorView} from "../components/error-views";
import {notifySuccess, notifyWarning} from "../lib/toaster";
import {Secret} from "../lib/models/secret";


const EventEditPage: React.FC = () => {
    const {eventId} = useParams<{ eventId: string; }>();
    const history = useHistory();
    const [t] = useTranslation();

    const [eventForm, setEventForm] = useState<Partial<Event_Form>>({})
    const [eventErrors, setEventErrors] = useState<Event_Errors>()
    const [eventSaving, setEventSaving] = useState(false)

    const {
        loading: eventLoading,
        error,
    } = useEvent({def: undefined, onLoad: setEventForm}, eventId);

    const {
        loading: secretLoading,
        result: secretsList,
    } = useSecretsList({def: [] as Secret[]})

    if (eventLoading || secretLoading) {
        return <PageLoadingSpinner/>;
    }

    if (error) {
        return <ErrorView error={error}/>
    }

    const handleSave = async () => {
        setEventErrors(undefined);

        const report = eventSchema(eventForm);
        if (!report.ok) {
            setEventErrors(report.error as Event_Errors);
            return;
        }

        setEventSaving(true);

        try {
            await updateEvent(eventId, report.output);

            notifySuccess(t('notification.eventUpdated'))

            history.push(`/events`);
        } catch (e) {
            setEventSaving(false);
        }
    }

    const handleDelete = async () => {
        setEventSaving(true);

        try {
            await deleteEvent(eventId)

            notifyWarning(t('notification.eventDeleted'))

            history.push(`/events`)
        } catch (e) {
            setEventSaving(false);
        }
    }

    return (
        <>
            <Heading>{t('heading.eventEdit')}</Heading>

            <EventForm
                loading={eventSaving}

                secretsList={secretsList}

                values={eventForm}
                errors={eventErrors}

                onChange={setEventForm}
                onSubmit={handleSave}
                onDelete={handleDelete}
            />
        </>
    )
};

export default EventEditPage;
