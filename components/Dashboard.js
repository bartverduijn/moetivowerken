import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'isomorphic-unfetch';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAtEfteling: false,
            ride: '',
            lastDate: '',
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const lastDate = [...Object.keys(nextProps.data).sort()].pop();
        if (lastDate && lastDate !== prevState.lastDate) {
            return {
                lastDate,
                isAtEfteling: nextProps.data[lastDate].isAtEfteling,
                ride: nextProps.data[lastDate].ride,
            };
        }
        return null;
    }

    saveToState = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const db = firebase.firestore();
        const date = new Date().getTime();
        if (!this.state.isAtEfteling) await this.setState({ ride: '' });
        db.collection('data')
            .doc(`${date}`)
            .set({ date, isAtEfteling: this.state.isAtEfteling, ride: this.state.ride });
    };

    render() {
        const { ride, isAtEfteling } = this.state;
        return (
            <>
                <form method="post" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <h2>Mijn dashboard</h2>
                        <label htmlFor="isAtEfteling">
                            Vandaag werk ik in de Efteling:
                            <input
                                type="checkbox"
                                name="isAtEfteling"
                                id="isAtEfteling"
                                checked={isAtEfteling}
                                onChange={this.saveToState}
                            />
                        </label>
                        <br />
                        {isAtEfteling && (
                            <label htmlFor="ride">
                                Attractie:
                                <input
                                    type="text"
                                    name="ride"
                                    placeholder="attractie"
                                    value={ride}
                                    onChange={this.saveToState}
                                />
                            </label>
                        )}
                        <button type="submit">Submit</button>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default Dashboard;
