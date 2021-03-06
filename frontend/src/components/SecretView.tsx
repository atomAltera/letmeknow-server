import React from "react"
import styled, {css} from "styled-components";
import {FaAt, FaLock, FaTelegram} from "react-icons/fa";
import {Secret, SecretKind} from "../lib/models/secret";
import {Box} from "./Box";
import {Button} from "@blueprintjs/core";
import {Link, useHistory} from "react-router-dom";

interface BaseProps {
    secret: Secret;
}


const iconStyle = css`
  font-size: 28px;
`

const TelegramIcon = styled(FaTelegram)`
  ${iconStyle};
  color: deepskyblue;
`

const EmailIcon = styled(FaAt)`
  ${iconStyle};
  color: #f32e2e;
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

export const SecretView: React.FC<BaseProps> = ({secret}) => {
    const history = useHistory();

    const Icon = getIconByKind(secret.kind);

    const editUrl = `/secrets/${secret.id}`;

    return (
        <Box>
            <Header>
                <Icon/>
                <Name><Link to={editUrl}>{secret.name}</Link></Name>
                <Button
                    icon="edit"
                    intent="none"
                    onClick={() => history.push(editUrl)}
                />
            </Header>
        </Box>
    )
}

