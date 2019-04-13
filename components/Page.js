import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Meta from './Meta';

const theme = { black: '#393939', red: '#cc1f1a', lightGrey: '#f1f5f8', white: '#FFFFFF' };

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
        width: 100vw;
        min-height: 100vw;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        min-height: 100vw;
        background: ${theme.lightGrey};
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
    }
    a {
        text-decoration: none;
        color: ${theme.red}
    }`;

const StyledPage = styled.div`
    min-height: 100vh;
    background: ${theme.lightGrey};
    color: ${theme.black};
`;

const Inner = styled.div`
    margin: 0 auto;
    padding: 2rem;
`;

const Page = ({ children }) => (
    <ThemeProvider theme={theme}>
        <StyledPage>
            <Meta />
            <GlobalStyle />
            <Inner>{children}</Inner>
        </StyledPage>
    </ThemeProvider>
);

export default Page;
