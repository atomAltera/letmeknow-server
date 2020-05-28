import React from "react";
import styled from "styled-components";
import {Spinner} from "@blueprintjs/core";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  margin: 10em;
`

const Caption = styled.p`
  color: #30404D;
  
  margin-top: 2em;
  text-align: center;
`

export const PageLoadingSpinner = () => {
    const [t] = useTranslation();

    return (
        <Wrapper>
            <Spinner size={Spinner.SIZE_LARGE}/>
            <Caption>{t('placeholder.appLoading')}</Caption>
        </Wrapper>
    )
}
