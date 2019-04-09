import React, { createContext } from 'react';

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ firebase, children }) => {
    const db = firebase.firestore();

    return <FirebaseContext.Provider value={db}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
export { FirebaseContext };
