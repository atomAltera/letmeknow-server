import React from "react"
import {Heading} from "./Heading";
import {Placeholder} from "./Placeholder";

interface Props {
    title: string;
    placeholderTitle?: string;
    placeholderDescription?: string;
}

export const NoDataView: React.FC<Props> = (props) => {
    return (
        <>
            <Heading>{props.title}</Heading>

            <Placeholder
                title={props.placeholderTitle}
                description={props.placeholderDescription}
            />
        </>
    )
}
