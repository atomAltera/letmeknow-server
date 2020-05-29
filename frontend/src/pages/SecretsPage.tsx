import React from "react"
import {RouterProps, withRouter} from "react-router";
import {useTranslation} from "react-i18next";
import {useSecretsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {SecretView} from "../components/SecretView";
import {Secret} from "../lib/models/secret";
import {NoDataPage} from "../components/NoDataPage";


const SecretsPage: React.FC<RouterProps> = (props) => {
    const [t] = useTranslation();

    const {
        loading,
        result: secretsList,
    } = useSecretsList(0, [] as Secret[])

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    if (secretsList.length === 0) {
        return (
            <NoDataPage
                title={t('heading.secrets')}
                placeholderTitle={t('placeholder.noSecrets.title')}
            />
        )
    }

    const handleEditClick = (secretId: string) => {
        props.history.push(`/secrets/${secretId}`)
    }

    return (
        <>
            <Heading>{t('heading.secrets')}</Heading>

            {secretsList.map(secret => (
                <SecretView
                    secret={secret}

                    onEditClick={() => handleEditClick(secret.id)}
                />
            ))}
        </>
    )
};

export default withRouter(SecretsPage);
