import React from "react"
import {useTranslation} from "react-i18next";
import {useSecretsList} from "../lib/api-hooks";
import {PageLoadingSpinner} from "../components/spinners";
import {Heading} from "../components/Heading";
import {SecretView} from "../components/SecretView";
import {Secret} from "../lib/models/secret";
import {NoDataView} from "../components/NoDataView";
import {Button} from "@blueprintjs/core";
import {useHistory} from "react-router";
import styled from "styled-components";

const Actions = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SecretsPage: React.FC = () => {
    const history = useHistory();
    const [t] = useTranslation();

    const {
        loading,
        result: secretsList,
    } = useSecretsList({def: [] as Secret[]})

    if (loading) {
        return <PageLoadingSpinner/>;
    }

    if (secretsList.length === 0) {
        return (
            <NoDataView
                title={t('heading.secrets')}
                placeholderTitle={t('placeholder.noSecrets.title')}
            />
        )
    }

    return (
        <>
            <Heading>{t('heading.secrets')}</Heading>

            {secretsList.map(secret => (
                <SecretView
                    key={secret.id}
                    secret={secret}
                />
            ))}

            <Actions>
                <Button
                    intent="primary"
                    icon="plus"
                    onClick={() => history.push(`/secrets/new`)}
                    large
                >{t('action.createSecret')}</Button>
            </Actions>
        </>
    )
};

export default SecretsPage;
