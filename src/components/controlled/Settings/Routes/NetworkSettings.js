import React, { Component } from 'react';
import Question from '../../Question';
export default class NetworkSettings extends Component{
    render(){
        return(
            <React.Fragment>
                <Question setting="throttle_requests" label="Should the program fetch slowly?(good for bad connections)" type="radio"/>
                <p>Implement advanced settings in order to specifiy concurrency etc.</p>
            </React.Fragment>
        )
    }
}
