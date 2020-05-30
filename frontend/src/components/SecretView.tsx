import React from "react"
import styled, {css} from "styled-components";
import {FaAt, FaTelegram, FaLock} from "react-icons/fa";
import {Secret, SecretKind} from "../lib/models/secret";
import {Box} from "./Box";
import {Button} from "@blueprintjs/core";

interface BaseProps {
    secret: Secret;

    onEditClick?: () => void;
}


const iconStyle = css`
  font-size: 2em;
`

const TelegramIcon = styled(FaTelegram)`
  ${iconStyle};
  color: deepskyblue;
`

const EmailIcon = styled(FaAt)`
  ${iconStyle};
  color: #ff0000;
`

const OtherIcon = styled(FaLock)`
  ${iconStyle};
`

const Header = styled.div`
  margin: 0 1em;
  
  display: grid;
  grid-template-columns: min-content auto min-content;
  align-items: center;
`

const Name = styled.h3`
  margin: 1em;
`

const getIconByKind = (kind: SecretKind) => {
    switch (kind) {
        case "telegram":
            return TelegramIcon
        case "email":
            return EmailIcon
        default:
            return OtherIcon;
    }
}

export const SecretView: React.FC<BaseProps> = (props) => {
    const {secret} = props;

    const Icon = getIconByKind(secret.kind);

    return (
        <Box>
            <Header>
                <Icon/>
                <Name>{secret.name}</Name>
                <Button
                    icon="edit"
                    intent="none"
                    onClick={props.onEditClick}
                />
            </Header>
        </Box>
    )
}
