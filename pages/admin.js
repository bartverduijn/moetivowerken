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

// Check if there is a token, and add the user prop
Admin.getInitialProps = async ({ req }) => {
    const user = req && req.session ? req.session.decodedToken : null;
    return { user };
};

export default Admin;
