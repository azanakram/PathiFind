import React, { Component } from 'react';
import { Router } from '@reach/router'
import firebase from 'firebase'

import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import ViewPath from './pages/ViewPath.jsx'
import Search from './pages/Search.jsx'
import Profile from './pages/Profile.jsx'

import ResponsiveNavigation from './components/ResponsiveNavigation.jsx'

import logo from './logo.svg';
import './App.css';

import history from './history';

const firebaseConfig = {
	apiKey: "AIzaSyCnd1So2ijkgUWAxgmXanbtECuNQVMU3WU",
	authDomain: "delta-8adb6.firebaseapp.com",
	databaseURL: "https://delta-8adb6.firebaseio.com",
	projectId: "delta-8adb6",
	storageBucket: "delta-8adb6.appspot.com",
	messagingSenderId: "791949266288",
	appId: "1:791949266288:web:13d84c925cdeb5017b13b5",
	measurementId: "G-Q4Z30MNE3B"
};

firebase.initializeApp(firebaseConfig);

const navLinks = [
	{
		text: 'Home',
		path: '/',
		icon: 'ion-ios-home'
	},

	{
		text: 'Search Paths',
		path: '/search',
		icon: 'ion-ios-search'
	},
	{
		text: 'Profile',
		path: '/profile',
		icon: 'ion-ios-person'
	},
]

class App extends Component {

	render() {

		return (

			<div className="App">

				<ResponsiveNavigation
					navLinks={navLinks}
					logo={logo}

				/>

				<Router>
					<Home path="/" history={history}/>
					<ViewPath path="/view-path" history={history}/>
					<SignIn path="/sign-in" history={history}/>
					<Search path="/search" history={history}/>
					<Profile path="/profile" history={history}/>
				</Router>
			</div>
		);
	}
}

export default App;
