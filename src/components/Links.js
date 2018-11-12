import React, { Component } from 'react';
export default class Links extends Component{
    constructor(props){
        super(props);
        this.state = {
            prevTarget: {}
        }
        this.handleClick = this.handleClick.bind(this); 
    }
    handleClick(e){
        // Reset so we only target one link at the time.
        let prevTarget = this.state.prevTarget;
        prevTarget.className = 'list-click';
        e.target.className += ' active';
        this.setState({
            prevTarget: e.target
        });
        // this.props.setLink(e);
    }
    render(){
        return(
            <ul className="links">
                {this.props.links.map((link, index) => <li key={link + index}><button className="list-click" onClick={this.handleClick}>{link}</button></li>)}
            </ul>
        )
    }
}
