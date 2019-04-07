import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import Link from 'next/link';
import clientCredentials from '../credentials/clientCreds';
import Dashboard from './Dashboard';

class Signin extends Component {
    // Check if there is a token, and add the user prop
    static async getInitialProps({ req }) {
        const user = req && req.session ? req.session.decodedToken : null;
        return { user };
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            user: props.user,
            data: {},
            unsubscribe: null,
        };
    }

    componentDidMount() {
        try {
            firebase.initializeApp(clientCredentials);
        } catch (err) {
            console.error(err);
        }

        // If there is already a logged in user, immediately handle db
        if (this.state.user) this.addDbListener();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
                return user
                    .getIdToken()
                    .then(token =>
                        fetch('/api/login', {
                            method: 'POST',
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                            credentials: 'same-origin',
                            body: JSON.stringify({ token }),
                        })
                    )
                    .then(res => this.addDbListener());
            }

            this.setState({ user: null });
            return fetch('/api/logout', {
                method: 'POST',
                credentials: 'same-origin',
            }).then(() => this.removeDbListener());
        });
    }

    addDbListener = () => {
        console.log('User is logged in! 🚀');

        const db = firebase.firestore();
        const unsubscribe = db.collection('data').onSnapshot(
            querySnapshot => {
                const data = {};
                querySnapshot.forEach(tuple => {
                    data[tuple.id] = tuple.data();
                });
                // If we found data in the database
                if (data) this.setState({ data });
            },
            err => console.error(err)
        );

        this.setState({ unsubscribe });
    };

    removeDbListener = () => {
        console.log('User is not logged in... 😢');
        if (this.state.unsubscribe) {
            this.state.unsubscribe();
        }
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Pass email and password to firebase
    handleSignin = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => console.error(err));
    };

    handleSignout = () => {
        firebase.auth().signOut();
    };

    render() {
        const { email, password, user, data } = this.state;
        return (
            <div>
                {!user ? (
                    <form
                        method="post"
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSignin(email, password);
                            return this.setState({ email: '', password: '' });
                        }}
                    >
                        <fieldset>
                            <h2>Sign in</h2>
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                ) : (
                    <>
                        <Dashboard data={data} />
                        <button type="button" onClick={this.handleSignout}>
                            Sign out
                        </button>
                        <Link href="/">
                            <a>Go to homepage</a>
                        </Link>
                    </>
                )}
            </div>
        );
    }
}

export default Signin;
