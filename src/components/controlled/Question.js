import React, { Component } from 'react';
import '../style.css';
import {connect} from 'unistore/react';
import actions from '../../actions';

export default class Question extends Component{
    constructor(props){
        super(props);
    }
    getCorrectInput(type){
        switch(type){
            case 'radio':
                return(
                    <React.Fragment>
                        <div>
                            <input type="radio" id={this.props.setting+"" + 1} name={this.props.setting} value="Yes"/>
                            <label for={this.props.key + 1}>Yes</label>
                            <input type="radio" id={this.props.setting +""+  2} name={this.props.setting} value="No" 
                            checked/>
                            <label for={this.props.key + 2}>No</label>
                        </div>
                    </React.Fragment>
                );
            default:
                    return;

        }
    }
    render(){
        let InputItem = connect('src', actions)(
            ({src, setSrc}) => {
                return(
                    <div className="setting-question">
                        <label className="setting-question-label">{this.props.label}</label>
                        {this.getCorrectInput(this.props.type)}
                    </div>
                )
            })
        return(
            <InputItem/>
        )
    }
}
