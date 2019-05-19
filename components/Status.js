import React from 'react';
import { format } from 'date-fns';
import nl from 'date-fns/locale/nl';
import styled from 'styled-components';
import FirestoreCollection from './FirestoreCollection';
import Card from './styles/Card';

const StatusStyles = styled.div`
    padding: 1rem;
    .date {
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: ${props => props.theme.grey};
        text-align: right;
    }
    .answer {
        font-family: 'Rubik';
        color: ${props => props.theme.red};
        font-size: 10rem;
        line-height: 1;
        margin: 2rem 0;
        text-align: center;
        font-weight: 900;
        padding: 0;
    }
    .ride {
        text-align: center;
        font-style: italic;
        color: ${props => props.theme.greyDark};
    }
`;

const Status = () => (
    <FirestoreCollection path="data" limit={1} orderBy={{ order: 'date', sort: 'desc' }}>
        {({ isLoading, data }) => (
            <Card>
                <StatusStyles>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <p className="date">
                                {format(new Date(data[0].date), 'dddd D MMMM YYYY', { locale: nl })}
                            </p>
                            <p className="answer">{data[0].isAtEfteling ? 'Ja' : 'Nee'}</p>
                            <p className="ride">
                                Ivo werkt vandaag{' '}
                                {data[0].ride ? `bij de ${data[0].ride}.` : 'niet.'}
                            </p>
                        </div>
                    )}
                </StatusStyles>
            </Card>
        )}
    </FirestoreCollection>
);
export default Status;
