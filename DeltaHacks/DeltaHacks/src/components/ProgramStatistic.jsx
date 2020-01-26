import React, { Component } from 'react'

function ProgramStatistic() {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         program: this.state.program,
    //         avgAccepted: this.props.avgAccepted,
    //         avgRejected: this.props.avgRejected,
    //         submissions: this.props.submissions
    //     }
    // }

    return (
        <div
            className="programStat"
            style={{
                backgroundColor: 'black',
                width: 60,
                height: 50,
                border: 10,
                borderStyle: 'solid',
                borderColor: 'black'
            }}
        >
            <h1>program</h1>
        </div>
    )
}


export default ProgramStatistic;