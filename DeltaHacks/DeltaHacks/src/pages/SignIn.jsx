import React, { Component } from 'react'
import googleLogo from './images/google_logo.png';
import firebase from 'firebase';

class SignIn extends Component {

    constructor(props) {

        super(props)

        this.state = {
        }
    }

    signIn = () => {

        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {

            console.log("Signed in")
            this.props.history.push('/');
            window.location.reload()

        }.bind(this)).catch(function (error) {

            console.log(error.message)
        });
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/');
                window.location.reload();
            }
        })
    }

    componentDidMount() {

        this.checkIfLoggedIn()
    }

    render() {
        return (
            <div
                style={{ padding: 60 }}
            >
                <h1>
                    Sign In
                </h1>

                <h2>
                    Please sign in with Google to continue.
                </h2>

                <button
                    style={{
                        contain: 'strict',
                        backgroundColor: '#333',
                        width: 500,
                        height: 300,
                        WebkitTextFillColor: 'white',
                        fontSize: 40,
                        borderRadius: 25,
                        boxShadow: 'none',
                    }}
                    onClick={() => { this.signIn() }}
                >

                    <img
                        src={googleLogo}
                        style={{
                            height: 200,
                            width: 200,
                            float: 'left',
                            paddingTop: 12,
                            paddingLeft: 10,
                            paddingRight: 30
                        }}
                    />
                    <p
                        style={{ textAlign: 'left', marginTop: 65, float: 'right', marginRight: 30 }}>
                        Sign in <br /> with Google</p>
                </button>

                <br />
                <h2>Why do you need to sign in? <br /> Google authentication helps sync and store your saved data.</h2>

            </div>
        )
    }
}

export default SignIn;