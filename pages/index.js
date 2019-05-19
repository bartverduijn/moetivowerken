import React from 'react';
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

export default Index;
