import React, { Component } from 'react';
import { FirebaseContext } from './FirebaseProvider';

class FirestoreCollection extends Component {
    state = {
        isLoading: true,
        data: [],
        snapshot: null,
    };

    componentDidMount() {
        this.addFirestoreListener();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.removeFirestoreListener();
            this.setState({ isLoading: true }, () => this.addFirestoreListener());
        }
    }

    componentWillUnmount() {
        this.removeFirestoreListener();
    }

    addFirestoreListener = () => {
        console.log('add FirestoreListener...');

        const { db, path, limit, orderBy } = this.props;
        const { order, sort } = orderBy;

        let collection = db.collection(path);
        if (orderBy) collection = collection.orderBy(order, sort);
        // If there is a limit prop, use it
        if (limit) collection = collection.limit(limit);

        this.unsubscribe = collection.onSnapshot(
            snapshot => {
                if (!snapshot) return;

                const data = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data(),
                }));

                this.setState({
                    isLoading: false,
                    data,
                    snapshot,
                });
            },
            err => console.error(err)
        );
    };

    removeFirestoreListener = () => {
        console.log('remove FirestoreListener...');

        if (this.unsubscribe) this.unsubscribe();
    };

    render() {
        const { children } = this.props;
        return children(this.state);
    }
}

export default FirestoreCollection;
