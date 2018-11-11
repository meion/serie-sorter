import React, { Component } from 'react';
import './style.css';
const {dialog} = window.Remote;

export default class InputItem extends Component{
    constructor(){
        super();
        this.state = {
            unset: true
        }
        this.src = React.createRef();
        this.srcSet = this.srcSet.bind(this);
    }
    srcSet(){
        var node = this.src.current;
        var string = dialog.showOpenDialog({properties: ['multiSelections', 'openDirectory']}) || "";
        if(string.length > 0){
            node.value = string.reduce((acc, curr) => acc + ',\n' + curr);
            console.log(node.value);
            node.style.height = 40 * string.length + 'px';
            this.setState({unset:false})
            if(this.props.handleDirInfo !== undefined && string.length > 0)this.props.handleDirInfo(node.id, string, node.value)
        }
    }
    componentDidMount(){
        if(this.state.unset){
            var node = this.src.current;
            node.value = this.props.label;
        }
    }
    render(){
        return(
            <React.Fragment>
                <button onClick={this.srcSet}>
                    <textarea ref={this.src} id={this.props.id} disabled/>
                </button>
            </React.Fragment>
        )
    }
}
