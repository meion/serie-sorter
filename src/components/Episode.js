import React, { Component } from 'react';
import './style.css';

export default class Episode extends Component{
    constructor(props){
        super(props);
        this.state = {
            number: this.props.number,
            season: this.props.season,
            name: this.props.name,
            src: this.props.src,
            dest: this.props.dest
        }
    }
    render(){
        return(
            <li>
                <span><b>Episode</b> {this.state.number}</span>
            </li>
        )
    }
}
