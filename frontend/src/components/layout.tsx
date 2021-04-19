import React from "react";
import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
  from {
    background: white;
  }
  
  to {
    background: #F5F8FA;
  }
`

export const SmallColumn = styled.div`
  max-width: 360px;
  margin: 0 auto;
  padding: 0 1em; 
`

export const SidebarSide = styled.div`
  background: white;
  justify-content: end;
  display: flex;
  align-items: start;
  animation: 1s ${fadeIn} ease-in-out forwards;
  min-height: 100vh;
  padding: 2rem 4rem;
`

export const SidebarContent = styled.div`
  position: fixed;
`

export const MainSide = styled.main`
  background: white;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const MainContent = styled.div`
  padding: 2rem 4rem; 
  width: 720px;
`

export const SidebarLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
`;


export const Sidebar: React.FC = (props) => {
    return (
        <SidebarSide>
            <SidebarContent>
                {props.children}
            </SidebarContent>
        </SidebarSide>
    )
}

export const Main: React.FC = (props) => {
    return (
        <MainSide>
            <MainContent>
                {props.children}
            </MainContent>
        </MainSide>
    )
}
