import React from 'react';
import { format } from 'date-fns';
import nl from 'date-fns/locale/nl';
import FirestoreCollection from './FirestoreCollection';

const Status = () => (
    <FirestoreCollection path="data" limit={1} orderBy={{ order: 'date', sort: 'desc' }}>
        {({ isLoading, data }) => (
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <p>{data[0].isAtEfteling ? 'Ja' : 'Nee'}</p>
                        <p>{data[0].ride}</p>
                        <p>{format(new Date(data[0].date), 'dddd D MMMM YYYY', { locale: nl })}</p>
                    </div>
                )}
            </div>
        )}
    </FirestoreCollection>
);
export default Status;
