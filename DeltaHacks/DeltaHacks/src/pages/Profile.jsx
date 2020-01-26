import React, { Component } from 'react';
import firebase from 'firebase';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseData: []
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

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push('/sign-in')
                window.location.reload();
            }
            else {
                this.setUser();

                let returnArr = [];

                firebase
                    .database()
                    .ref('/users/' + user.uid + '/courses')
                    .once('value')
                    .then(snapshot => {

                        snapshot.forEach(childSnapshot => {
                            let item = childSnapshot.val();
                            item.key = childSnapshot.key;

                            console.log(item)
                            returnArr.push(item);
                        })

                        this.setState({
                            courseData: returnArr.reverse()
                        })
                    })


            }
        })
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    viewCourse(course, pathKey, courseTitle) {
        this.props.history.push('/view-path', {
            courses: course,
            pathKey: pathKey,
            courseTitle: courseTitle,
            savedState: true
        });
        window.location.reload();
    }

    render() {

        return (
            <div
                style={{ padding: 60 }}
            >

                <h1>
                    Profile
                </h1>

                <div>

                    <button
                        style={{
                            backgroundColor: '#333',
                            width: 300,
                            height: 100,
                            WebkitTextFillColor: 'white',
                            fontSize: 25,
                            borderRadius: 25,
                            boxShadow: 'none'
                        }}
                        onClick={() => {
                            this.props.history.push('/search')
                            window.location.reload();
                        }}>

                        <p
                            style={{ float: 'middle', fontSize: 35, marginTop: 30 }}>
                            New Path </p>
                    </button>

                    <h1> Saved Courses: </h1>
                    {this.state.courseData.map(course =>
                        <div>
                            <button
                                onClick={() => this.viewCourse(course.courses, course.key, course.courseTitle)}
                                className="coursePreview"
                            >
                                <p>{course.courseTitle}</p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Profile;