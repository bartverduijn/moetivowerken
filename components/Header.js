import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderStyle = styled.header`
    padding: 2rem 2rem;
    h1 {
        color: ${props => props.theme.grey};
        font-size: 2rem;
        line-height: 0;
        letter-spacing: 0.02em;
        font-family: 'Rubik';
    }
`;

const Header = () => (
    <HeaderStyle>
        <Link href="/">
            <a>
                <h1>MOET IVO WERKEN?</h1>
            </a>
        </Link>
    </HeaderStyle>
);

export default Header;
