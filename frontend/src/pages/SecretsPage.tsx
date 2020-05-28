import React from "react"
import {useTranslation} from "react-i18next";
import {useSecretsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {Placeholder} from "../components/Placeholder";
import {SecretsTable} from "./secretsPage/SecretsTable";


const SecretsPage: React.FC = () => {
    const [t] = useTranslation();

    const {
        loading,
        result: secretsList,
    } = useSecretsList(0, [])

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    return (
        <>
            <Heading>{t('heading.secrets')}</Heading>

            {secretsList.length === 0 ? (
                <Placeholder
                    title={t('placeholder.noSecrets.title')}
                />
            ) : (
                <SecretsTable
                    secretsList={secretsList}
                />
            )}
        </>
    )
};

export default SecretsPage;
