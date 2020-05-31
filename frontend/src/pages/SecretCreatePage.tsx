import React, {useState} from "react"
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {Heading} from "../components/Heading";
import {
    baseSecretSchema,
    partEmailSecretSchema,
    partTelegramSecretSchema,
    Secret_Errors,
    Secret_Form
} from "../lib/models/secret";
import {SecretForm} from "../components/forms/SecretForm";
import {createSecret} from "../lib/api-client";
import {notifySuccess} from "../lib/toaster";

const SecretCreatePage: React.FC = () => {
    const history = useHistory();
    const [t] = useTranslation();

    const [secretForm, setSecretForm] = useState<Partial<Secret_Form>>({kind: "telegram"})
    const [secretErrors, setSecretErrors] = useState<Secret_Errors>()
    const [secretLoading, setSecretLoading] = useState(false)

    const handleSave = async () => {
        setSecretErrors(undefined);

        const baseReport = baseSecretSchema(secretForm);
        if (!baseReport.ok) {
            setSecretErrors(baseReport.error as Secret_Errors);
            return;
        }

        let form: Secret_Form;

        switch (baseReport.output.kind) {
            case "telegram":
                const telegramReport = partTelegramSecretSchema(secretForm);
                if (!telegramReport.ok) {
                    setSecretErrors(telegramReport.error as Secret_Errors);
                    return;
                }

                form = {...baseReport.output, ...telegramReport.output} as Secret_Form;
                break;

            case "email":
                const emailReport = partEmailSecretSchema(secretForm);
                if (!emailReport.ok) {
                    setSecretErrors(emailReport.error as Secret_Errors);
                    console.log(emailReport.error);
                    return;
                }

                form = {...baseReport.output, ...emailReport.output} as Secret_Form;
                break;
        }

        setSecretLoading(true);

        try {
            await createSecret(form)

            notifySuccess(t('notification.secretCreated'))

            history.push(`/secrets`)
        } catch (e) {
            setSecretLoading(false);
        }
    }

    return (
        <>
            <Heading>{t('heading.secretCreate')}</Heading>

            <SecretForm
                loading={secretLoading}

                values={secretForm}
                errors={secretErrors}

                onChange={setSecretForm}
                onSubmit={handleSave}
            />
        </>
    )
};

export default SecretCreatePage;
