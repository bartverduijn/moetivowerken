import React, { createContext } from 'react';

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ firebase, children }) => {
    const context = {
        db: firebase.firestore(),
        auth: firebase.auth(),
    };

    return <FirebaseContext.Provider value={context}>{children}</FirebaseContext.Provider>;
};

const withFirebaseConsumer = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
export { FirebaseProvider, withFirebaseConsumer };
