import React from 'react';
import Link from 'next/link';
import FirebaseSignIn from '../components/FirebaseSignIn';

import AdminDashboard from '../components/AdminDashboard';

const Admin = () => (
    <>
        <FirebaseSignIn>
            <AdminDashboard />
        </FirebaseSignIn>

        <Link href="/">
            <a>Go to homepage</a>
        </Link>
    </>
);

export default Admin;
