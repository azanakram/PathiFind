import React, { Component } from 'react';
import firebase from 'firebase';

class Search extends Component {

    constructor(props) {

        super(props)

        this.state = {
            searchText: '',
            dict: {
                'SQL': [
                    ['Introduction to Databases and SQL Querying', 'https://www.udemy.com/course/introduction-to-databases-and-sql-querying/'],
                    ['Advanced Databases and SQL Querying', 'https://www.udemy.com/course/advanced-tsql-querying-using-sql-2014/'],
                    ['Excel VBA programming by Examples (MS Excel 2016)', 'https://www.udemy.com/course/excel-vba-programming-by-examples/']],
    
                'React js': [
                    ['React JS Frontend Web Development for Beginners', 'https://www.udemy.com/course/react-tutorial/'],
                    ['Perfect React JS Course for Beginners', 'https://www.udemy.com/course/perfect-react-js-course/'],
                    ['Mastering React JS', 'https://www.udemy.com/course/mastering-reactjs/']],
    
                'C#': [
                    ['C# Basics - For Complete Beginners', 'https://www.udemy.com/course/c-sharp-basics-for-complete-newbies/'],
                    ['C# Web-Based Applications', 'https://www.udemy.com/course/c-web-based-applications/'],
                    ['Expert Programming in C# and .NET', 'https://www.udemy.com/course/expert-programming-in-c-and-net/']],
    
                'Java': [
                    ['Java Programming Basics', 'https://www.udemy.com/course/java-programming-basics/'],
                    ['Java Design Patterns and Architecture', 'https://www.udemy.com/course/java-design-patterns-tutorial/'],
                    ['Java for Advanced Users', 'https://www.udemy.com/course/java-for-advanced-users/']],
    
                'Python': [
                    ['Introduction To Python Programming', 'https://www.udemy.com/course/pythonforbeginnersintro/'],
                    ['Fundamentals of Programming using Python 3', 'https://www.udemy.com/course/fundamentals-of-programming-using-python-3/'],
                    ['Natural Language Processing with Deep Learning in Python', 'https://www.udemy.com/course/natural-language-processing-with-deep-learning-in-python/']],
    
                'JavaScript': [
                    ['Javascript Essentials', 'https://www.udemy.com/course/javascript-essentials/'],
                    ['Advanced and Object Oriented JavaScript and ES6', 'https://www.udemy.com/course/advanced-and-object-oriented-javascript/'],
                    ['Mastering JavaScript', 'https://www.udemy.com/course/mastering-javascript/']]
            }
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {

        this.setState({
            searchText: e.target.value
        })
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.props.history.push('/sign-in');
                window.location.reload();
            }
        })
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    render() {

        return (
            <div
                style={{
                    padding: 60,
                    flexDirection: 'column'
                }}
            >

                <h1>
                    Search for career resources
                </h1>

                <input
                    className="searchbar"
                    type="text"
                    placeholder="Enter a career path"
                    onChange={this.handleChange}
                >

                </input>
                <br />
                <button
                    style={{
                        marginTop: 30,
                        backgroundColor: '#333',
                        width: 300,
                        height: 100,
                        WebkitTextFillColor: 'white',
                        fontSize: 25,
                        borderRadius: 25,
                        boxShadow: 'none'
                    }}
                    onClick={() => {
                        console.log(this.state.searchText)
                        console.log(this.state.dict[this.state.searchText]);

                        this.props.history.push('/view-path', {
                            courses: this.state.dict[this.state.searchText],
                            pathKey: '',
                            courseTitle: this.state.searchText,
                            savedState: false
                        });
                        window.location.reload();
                    }}>

                    <p
                        style={{ float: 'middle', fontSize: 35, marginTop: 30 }}>
                        Search
                    </p>
                </button>
            </div>
        )
    }
}

export default Search;