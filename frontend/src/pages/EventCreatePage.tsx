import React, {useState} from "react"
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {Heading} from "../components/Heading";
import {Event_Errors, Event_Form, eventSchema} from "../lib/models/event";
import {EventForm} from "../components/forms/EventForm";
import {createEvent} from "../lib/api-client";
import {notifySuccess} from "../lib/toaster";
import {useSecretsList} from "../lib/api-hooks";
import {Secret} from "../lib/models/secret";
import {PageLoadingSpinner} from "../components/spinners";

const EventCreatePage: React.FC = () => {
    const history = useHistory();
    const [t] = useTranslation();

    const [eventForm, setEventForm] = useState<Partial<Event_Form>>({isActive: true,})
    const [eventErrors, setEventErrors] = useState<Event_Errors>()
    const [eventSaving, setEventSaving] = useState(false)

    const {
        loading: secretLoading,
        result: secretsList,
    } = useSecretsList({def: [] as Secret[]})

    if (secretLoading) {
        return <PageLoadingSpinner/>;
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
            await createEvent(report.output);

            notifySuccess(t('notification.eventCreated'))

            history.push(`/events`);
        } catch (e) {
            setEventSaving(false);
        }
    }

    return (
        <>
            <Heading>{t('heading.eventCreate')}</Heading>

            <EventForm
                loading={eventSaving}

                secretsList={secretsList}

                values={eventForm}
                errors={eventErrors}

                onChange={setEventForm}
                onSubmit={handleSave}
            />
        </>
    )
};

export default EventCreatePage;
