import React, { Component } from 'react';
import { withFirebaseConsumer } from './FirebaseContext';

class AdminDashboard extends Component {
    state = {
        isAtEfteling: false,
        ride: '',
    };

    saveToState = e => {
        if (e.target.type === 'checkbox' && !e.target.checked) this.setState({ ride: '' });

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
    };

    handleSubmit = async e => {
        const {
            firebase: { db },
        } = this.props;
        e.preventDefault();
        const date = new Date().getTime();
        if (!this.state.isAtEfteling) await this.setState({ ride: '' });
        db.collection('data')
            .doc(`${date}`)
            .set({ date, isAtEfteling: this.state.isAtEfteling, ride: this.state.ride });
        this.setState({ isAtEfteling: false, ride: '' });
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

export default withFirebaseConsumer(AdminDashboard);