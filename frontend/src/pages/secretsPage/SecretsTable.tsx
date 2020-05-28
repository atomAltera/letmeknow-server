import React from "react"
import styled from "styled-components";
import {Secret, SecretKind} from "../../lib/models/secret";
import {FaAt, FaTelegram} from "react-icons/fa";

interface Props {
    secretsList: Secret[];
}


export const Row = styled.div`
  padding: 1em;
  margin: 1em -1em;
  
  background: #F5F8FA;
  border-radius: 3px;
`


const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 1em;
`

const TelegramIcon = styled(FaTelegram)`
  font-size: 2em;
  color: deepskyblue;
`

const EmailIcon = styled(FaAt)`
  font-size: 2em;
  color: red;
`

const Name = styled.h3`
  margin: 1em;
`

const getIconByKind = (kind: SecretKind) => {
    switch (kind) {
        case "telegram":
            return <TelegramIcon/>
        case "email":
            return <EmailIcon/>
        default:
            return true;
    }
}

export const SecretsTable: React.FC<Props> = (props) => {
    return (
        <>
            {props.secretsList.map(secret => (
                <Row key={secret.id}>
                    <Header>
                        {getIconByKind(secret.kind)}
                        <Name>{secret.name}</Name>
                    </Header>
                </Row>
            ))}
        </>
    )
}
