import React, {useState} from "react"
import {RouteComponentProps, withRouter} from "react-router";
import {useTranslation} from "react-i18next";
import {useSecret} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {
    baseSecretSchema,
    partEmailSecretSchema,
    partTelegramSecretSchema,
    Secret_Errors,
    Secret_Form
} from "../lib/models/secret";
import {SecretForm} from "../components/forms/SecretForm";
import {updateSecret} from "../lib/api-client";

interface Params {
    secretId: string;
}

const SecretEditPage: React.FC<RouteComponentProps<Params>> = (props) => {
    const secretId = props.match.params.secretId;

    const [t] = useTranslation();

    const [secretForm, setSecretForm] = useState<Partial<Secret_Form>>({})
    const [secretErrors, setSecretErrors] = useState<Secret_Errors>()
    const [secretLoading, setSecretLoading] = useState(false)

    const {
        loading,
    } = useSecret({def: undefined, onLoad: setSecretForm}, secretId)

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    const handleSubmit = async () => {
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
                    return;
                }

                form = {...baseReport.output, ...emailReport.output} as Secret_Form;
                break;
        }

        setSecretLoading(true);

        try {
            await updateSecret(secretId, form)

            props.history.push(`/secrets`)
        } catch (e) {
            setSecretLoading(false);
        }
    }

    return (
        <>
            <Heading>{t('heading.secretEdit')}</Heading>

            <SecretForm
                loading={secretLoading}

                values={secretForm}
                errors={secretErrors}

                onChange={setSecretForm}
                onSubmit={handleSubmit}
            />
        </>
    )
};

export default withRouter(SecretEditPage);
