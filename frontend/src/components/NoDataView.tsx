import React from "react"
import {Heading} from "./Heading";
import {Placeholder} from "./Placeholder";
import {useHistory} from "react-router";
import {Button} from "@blueprintjs/core";
import styled from "styled-components";

interface Props {
    title: string;
    placeholderTitle?: string;
    placeholderDescription?: string;

    createLinkTitle?: string;
    createLinkHref?: string;
}

const AddButton = styled(Button)`
  margin-top: 1em;
`

export const NoDataView: React.FC<Props> = (props) => {
    const history = useHistory();

    const {
        title,
        placeholderTitle,
        placeholderDescription,
        createLinkHref,
        createLinkTitle,
    } = props;

    return (
        <>
            <Heading>{title}</Heading>

            <Placeholder
                title={placeholderTitle}
                description={placeholderDescription}
            />

            {createLinkHref && (
                <AddButton
                    intent="primary"
                    icon="plus"
                    onClick={() => history.push(createLinkHref)}
                    large
                >{createLinkTitle}</AddButton>
            )}
        </>
    )
}
