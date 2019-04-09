import App, { Container } from 'next/app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import clientCredentials from '../credentials/clientCreds';
import FirebaseProvider from '../components/FirebaseProvider';

// If there isn't a initialized firebase app yet
if (firebase.apps.length === 0) {
    firebase.initializeApp(clientCredentials);
}

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <FirebaseProvider firebase={firebase}>
                    <Component {...pageProps} />
                </FirebaseProvider>
            </Container>
        );
    }
}

export default MyApp;
