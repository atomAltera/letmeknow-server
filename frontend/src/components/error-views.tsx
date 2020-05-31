import React from "react"
import {Heading} from "./Heading";
import {useTranslation} from "react-i18next";

interface Props {
    error: any;
}

export const NotFoundErrorView = () => {
    const [t] = useTranslation();

    return (
        <>
            <Heading>404</Heading>
            <p>{t('error.resource_not_found')}</p>
        </>
    )
}

export const ErrorView: React.FC<Props> = ({error}) => {
    const [t] = useTranslation();

    if (error.response?.status === 404) {
        return <NotFoundErrorView/>
    }

    return (
        <>
            <Heading>{t('heading.error')}</Heading>
            <p>{error.message}</p>
        </>
    )

};
