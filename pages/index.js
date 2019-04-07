import React from 'react';
// import PropTypes from 'prop-types';
import Link from 'next/link';
import Status from '../components/Status';

const Index = () => (
    <>
        <Status />

        <Link href="/admin">
            <a>Log in</a>
        </Link>
    </>
);

// Home.propTypes = {};

export default Index;
