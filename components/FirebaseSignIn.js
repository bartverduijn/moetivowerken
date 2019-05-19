import React, { Component } from 'react';
import 'isomorphic-unfetch';
import styled from 'styled-components';
import { withFirebaseConsumer } from './FirebaseContext';
import FormStyles from './styles/FormStyles';
import Card from './styles/Card';

const SignOutButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0 0 1rem 0;
    color: ${props => props.theme.red};
`;

class FirebaseSignIn extends Component {
    state = {
        email: '',
        password: '',
        user: this.props.user,
        isLoading: false,
    };

    componentDidMount() {
        const {
            firebase: { auth },
        } = this.props;

        this.unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
                return user
                    .getIdToken(true)
                    .then(token =>
                        fetch('/api/login', {
                            method: 'POST',
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                            credentials: 'same-origin',
                            body: JSON.stringify({ token }),
                        }).catch(err => console.error(err))
                    )
                    .then(() => this.setState({ isLoading: false }))
                    .catch(err => console.error(err));
            }

            this.setState({ user: null });
            return fetch('/api/logout', {
                method: 'POST',
                credentials: 'same-origin',
            })
                .then(() => this.setState({ isLoading: false }))
                .catch(err => console.error(err));
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Pass email and password to firebase
    handleSignin = (email, password, auth) => {
        auth.signInWithEmailAndPassword(email, password).catch(err => console.error('error', err));
    };

    handleSignout = auth => {
        auth.signOut();
    };

    render() {
        const {
            firebase: { auth },
            children,
        } = this.props;
        const { email, password, user, isLoading } = this.state;

        return (
            <div>
                {!user ? (
                    <Card>
                        <FormStyles>
                            <form
                                method="post"
                                onSubmit={e => {
                                    e.preventDefault();
                                    this.setState({ isLoading: true });
                                    this.handleSignin(email, password, auth);
                                    return this.setState({ email: '', password: '' });
                                }}
                            >
                                {isLoading && <div className="loader">Loading...</div>}
                                <fieldset disabled={isLoading}>
                                    <h2>Log in met je account.</h2>
                                    <label htmlFor="email">
                                        Email
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="johndoe@example.com"
                                            value={email}
                                            onChange={this.saveToState}
                                        />
                                    </label>
                                    <label htmlFor="password">
                                        Wachtwoord
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={this.saveToState}
                                        />
                                    </label>
                                    <button type="submit">Log in</button>
                                </fieldset>
                            </form>
                        </FormStyles>
                    </Card>
                ) : (
                    <>
                        {children}
                        <SignOutButton type="button" onClick={e => this.handleSignout(auth)}>
                            Uitloggen
                        </SignOutButton>
                    </>
                )}
            </div>
        );
    }
}

export default withFirebaseConsumer(FirebaseSignIn);
