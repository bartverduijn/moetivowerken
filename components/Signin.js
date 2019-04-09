import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'isomorphic-unfetch';
import Link from 'next/link';
import Dashboard from './Dashboard';
import FirestoreCollection from './FirestoreCollection';

class Signin extends Component {
    // Check if there is a token, and add the user prop
    static async getInitialProps({ req }) {
        const user = req && req.session ? req.session.decodedToken : null;
        return { user };
    }

    state = {
        email: '',
        password: '',
        user: this.props.user,
    };

    componentDidMount() {
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
                    .then(res => console.log('Login was succesvol!', res));
            }

            this.setState({ user: null });
            return fetch('/api/logout', {
                method: 'POST',
                credentials: 'same-origin',
            }).then(res => console.log('Logout was succesvol!', res));
        });
    }

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
        const { db } = this.props;
        const { email, password, user } = this.state;
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
                        <FirestoreCollection
                            db={db}
                            path="data"
                            limit={1}
                            orderBy={{ order: 'date', sort: 'desc' }}
                        >
                            {({ isLoading, data }) => (
                                <div>
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <Dashboard db={db} data={data} />
                                    )}
                                </div>
                            )}
                        </FirestoreCollection>

                        <button type="button" onClick={this.handleSignout}>
                            Sign out
                        </button>
                    </>
                )}
                <Link href="/">
                    <a>Go to homepage</a>
                </Link>
            </div>
        );
    }
}

export default Signin;
