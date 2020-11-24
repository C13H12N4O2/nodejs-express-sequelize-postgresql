import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    componentDidMount() {
        this.timerID = setInterval(
           () => this.tick(),
           1000
       );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render() {
        return (
            <div>
                <Hello />
                <WhatTimeIsRightNowDotCom date={this.state.date} />
            </div>
        );
    }
}

function Hello() {
    return(<h1>Hello, world!</h1>);
}

function WhatTimeIsRightNowDotCom(props) {
    return (<h2>It is {props.date.toLocaleTimeString()}.</h2>);
}
