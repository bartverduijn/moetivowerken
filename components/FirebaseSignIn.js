import React, { Component } from 'react';
import 'isomorphic-unfetch';
import { withFirebaseConsumer } from './FirebaseContext';

class FirebaseSignIn extends Component {
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
                    .then(res => console.log('Login was succesvol!', res))
                    .catch(err => console.error(err));
            }

            this.setState({ user: null });
            return fetch('/api/logout', {
                method: 'POST',
                credentials: 'same-origin',
            })
                .then(res => console.log('Logout was succesvol!', res))
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
        const { email, password, user } = this.state;

        return (
            <div>
                {!user ? (
                    <form
                        method="post"
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSignin(email, password, auth);
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
                    children
                )}
            </div>
        );
    }
}

export default withFirebaseConsumer(FirebaseSignIn);
