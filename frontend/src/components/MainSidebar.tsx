import React from "react"
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Sidebar} from "./layout";
import {Logo} from "./Logo";

const Nav = styled.nav`
  margin-top: 2rem;
`;

const Item = styled(Link)`
  display: block;
  padding: 0.3em;
  
  color: #137CBD;
  
  &:hover {
    color: #48AFF0;
  }
`

export const MainSidebar: React.FC = () => {
    const [t] = useTranslation();

    return (
        <Sidebar>
            <Logo>Let me Know</Logo>

            <Nav>
                <Item to="/events">{t('menu.events')}</Item>
                <Item to="/secrets">{t('menu.secrets')}</Item>
            </Nav>
        </Sidebar>
    )
}
