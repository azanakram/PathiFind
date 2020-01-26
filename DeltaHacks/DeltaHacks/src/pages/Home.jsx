import React, { Component } from 'react';
import firebase from 'firebase';

import largeLogo from './images/pf_large.png'

class Home extends Component {

    constructor(props) {

        super(props)

        this.state = {
            redirect: false
        }
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push('/sign-in')
                window.location.reload()
            }
        })
    }

    componentDidMount() {

        this.checkIfLoggedIn();
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            this.props.history.push('/sign-in');
            window.location.reload();
        }

        return (
            <div
                style={{ padding: 60 }}
            >

                <h1>
                    PathiFind
                </h1>

                <h1>
                    Search for the career you want. Learn the skills you need.</h1>

                <img
                src={largeLogo}
                style={{width: 500, marginBottom: -150, marginTop: -50}}
                />
                <h2> <br /><br />  Search something you want to learn and get matched with a list of resources to complete.
                    <br /> Save resources in your account and access them any time by signing into your Google account.
                </h2>
            </div>
        )
    }
}

export default Home;