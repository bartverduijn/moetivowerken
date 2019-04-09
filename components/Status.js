import React from 'react';
import FirestoreCollection from './FirestoreCollection';
import { FirebaseContext } from './FirebaseProvider';

const Status = () => (
    <FirebaseContext.Consumer>
        {db => (
            <FirestoreCollection
                path="data"
                limit={1}
                orderBy={{ order: 'date', sort: 'desc' }}
                db={db}
            >
                {({ isLoading, data }) => (
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <p>{data[0].isAtEfteling ? 'Ja' : 'Nee'}</p>
                                <p>{data[0].ride}</p>
                                <p>{data[0].date}</p>
                            </div>
                        )}
                    </div>
                )}
            </FirestoreCollection>
        )}
    </FirebaseContext.Consumer>
);
export default Status;
