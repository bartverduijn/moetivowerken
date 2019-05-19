import React, { Component } from 'react';
import styled from 'styled-components';
import { withFirebaseConsumer } from './FirebaseContext';
import Toggle from './styles/Toggle';
import FormStyles from './styles/FormStyles';
import Card from './styles/Card';

class AdminDashboard extends Component {
    state = {
        isAtEfteling: false,
        ride: '',
        isLoading: false,
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
        this.setState({ isLoading: true });
        const date = new Date().getTime();
        if (!this.state.isAtEfteling) await this.setState({ ride: '' });
        db.collection('data')
            .doc(`${date}`)
            .set({ date, isAtEfteling: this.state.isAtEfteling, ride: this.state.ride })
            .then(() => this.setState({ isLoading: false, isAtEfteling: false, ride: '' }))
            .catch(err => console.error(err));
    };

    render() {
        const { ride, isAtEfteling, isLoading } = this.state;
        return (
            <Card>
                <FormStyles>
                    <form method="post" onSubmit={this.handleSubmit}>
                        {isLoading && <div className="loader">Loading...</div>}
                        <fieldset disabled={isLoading}>
                            <h2>Mijn Dashboard</h2>

                            <Toggle>
                                <input
                                    type="checkbox"
                                    name="isAtEfteling"
                                    id="isAtEfteling"
                                    checked={isAtEfteling}
                                    onChange={this.saveToState}
                                />
                                <label className="toggle" htmlFor="isAtEfteling">
                                    In de Efteling:
                                </label>
                            </Toggle>

                            {isAtEfteling && (
                                <label htmlFor="ride">
                                    Attractie:
                                    <input
                                        type="text"
                                        name="ride"
                                        placeholder="Joris en de Draak, Pandadroom, etc..."
                                        value={ride}
                                        onChange={this.saveToState}
                                    />
                                </label>
                            )}
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </FormStyles>
            </Card>
        );
    }
}

export default withFirebaseConsumer(AdminDashboard);
