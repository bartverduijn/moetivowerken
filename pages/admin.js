import React from 'react';
import Signin from '../components/Signin';
import { FirebaseContext } from '../components/FirebaseProvider';

const Admin = props => (
    <FirebaseContext.Consumer>{db => <Signin {...props} db={db} />}</FirebaseContext.Consumer>
);

export default Admin;
