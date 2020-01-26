import React, { Component } from 'react'
import * as firebase from 'firebase'

class Predict extends Component {

    constructor(props) {

        super(props)

        console.log(this.props.location)
        this.state = {
            user: '',
            courses: this.props.location.state.state.courses,
            pathKey: this.props.location.state.state.pathKey,
            savedState: this.props.location.state.state.savedState,
            courseTitle: this.props.location.state.state.courseTitle
        }
    }

    setUser = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.setState({
                    user: user
                })
            }
        }.bind(this))
    }

    savePath = (currUser, courses, title) => {

        this.setState({
            savedState: true
        })

        if (this.state.savedState === false) {
            firebase
                .database()
                .ref('/users/' + currUser.uid + '/courses')
                .push({
                    courses: courses,
                    courseTitle: title
                })
                .then((snap) => {

                    this.setState({
                        pathKey: snap.key
                    })
                })
        }


    }

    deletePath = (currUser) => {
        firebase
            .database()
            .ref('/users/' + currUser.uid + '/paths')
            .child('' + this.state.pathKey).remove();

        this.setState({
            savedState: false
        })
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push('/sign-in')
            }
            else {
                this.setUser();
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
        }

        return (

            <div style={{ padding: 60 }}>

                <h1>{this.state.courseTitle}</h1>

                <div
                    style={{
                        paddingBottom: 50,
                    }}>
                    <button
                        className="viewButton"
                        onClick={() => this.savePath(this.state.user, this.state.courses, this.state.courseTitle)}
                        disabled={this.state.savedState ? true : false}
                        style={{ backgroundColor: this.state.savedState ? '#eee' : '#333' }}>
                        Save
                    </button>

                    <button
                        className="viewButton"
                        onClick={() => this.deletePath(this.state.user)}
                        disabled={this.state.savedState ? false : true}
                        style={{ backgroundColor: this.state.savedState ? '#333' : '#eee' }}
                    >
                        Delete
                    </button>
                </div>

                <div style={{ flexDirection: 'column' }}>

                    {this.state.courses.map(course =>
                        <div className={"courseList"}>
                            <div className='course'>
                                <p>{course[0]}</p>
                                <a href={course[1]}
                                    target="_blank">
                                    <i
                                        className={'ion-ios-link'}
                                    ></i>
                                </a>
                            </div>
                            <br />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Predict;