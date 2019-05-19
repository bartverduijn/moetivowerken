import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import Meta from './Meta';
import Header from './Header';

const theme = {
    red: '#cc1f1a',
    black: '#22292f',
    greyDarkest: '#3d4852',
    greyDarker: '#606f7b',
    greyDark: '#8795a1',
    grey: '#b8c2cc',
    greyLight: '#dae1e7',
    greyLighter: '#f1f5f8',
    greyLightest: '#f8fafc',
    white: '#ffffff',
};

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
        height: 100%;
        width: 100%;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 1.5rem;
        line-height: 2;
        height: 100%;
        width: 100%;
    }
    a {
        text-decoration: none;
        color: ${theme.red}
    }`;

const StyledPage = styled.div`
    background: ${theme.greyLighter};
    color: ${theme.black};
    height: 100vh;
    width: 100vw;
`;

const Inner = styled.div`
    margin: 0 auto;
    padding: 2rem;
`;

const Page = ({ children }) => (
    <ThemeProvider theme={theme}>
        <StyledPage>
            <Meta />
            <Normalize />
            <GlobalStyle />
            <Header />
            <Inner>{children}</Inner>
        </StyledPage>
    </ThemeProvider>
);

export default Page;
