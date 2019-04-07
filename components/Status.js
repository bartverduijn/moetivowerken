import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import Link from 'next/link';
import clientCredentials from '../credentials/clientCreds';

class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAtEfteling: false,
            ride: '',
            lastDate: '',
        };
    }

    componentDidMount() {
        try {
            firebase.initializeApp(clientCredentials);
        } catch (err) {
            console.error(err);
        }
        this.addDbListener();
    }

    handleData = data => {
        const lastDate = [...Object.keys(data).sort()].pop();
        this.setState({
            lastDate,
            isAtEfteling: data[lastDate].isAtEfteling,
            ride: data[lastDate].ride,
        });
    };

    addDbListener = () => {
        const db = firebase.firestore();
        const unsubscribe = db.collection('data').onSnapshot(
            querySnapshot => {
                const data = {};
                querySnapshot.forEach(tuple => {
                    data[tuple.id] = tuple.data();
                });
                // If we found data in the database
                if (data) this.handleData(data);
            },
            err => console.error(err)
        );

        this.setState({ unsubscribe });
    };

    render() {
        const { isAtEfteling, ride, lastDate } = this.state;
        return (
            <>
                <div>
                    <h2>{isAtEfteling ? 'JA' : 'NEE'}</h2>
                    <p>{ride}</p>
                    <p>{lastDate}</p>
                </div>
                <Link href="/admin">
                    <a>Log in</a>
                </Link>
            </>
        );
    }
}

export default Status;
