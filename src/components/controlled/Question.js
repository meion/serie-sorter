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
                let Radio = connect('settings', actions)(
                    ({settings, changeSetting}) => {
                        return(
                            <React.Fragment>
                                <div>
                                    <input type="radio" id={this.props.setting+"" + 1} onChange={(e) => changeSetting(this.props.setting, e)} name={this.props.setting} value="Yes"/>
                                    <label htmlFor={this.props.key +""+ 1}>Yes</label>
                                    <input type="radio" id={this.props.setting +""+  2} onChange={(e) => changeSetting(this.props.setting, e)} name={this.props.setting} value="No" 
                                    defaultChecked/>
                                    <label htmlFor={this.props.key +""+ 2}>No</label>
                                </div>
                            </React.Fragment>
                        )
                    })
                return(<Radio />)
            case 'textarea':
                    let TextArea = connect('src', actions)(
                        ({src, setSrc}) => {
                            return(
                                <React.Fragment>
                                    <button onClick={setSrc}>
                                        <textarea value={src} disabled/>
                                    </button>
                                </React.Fragment>
                            )
                        })
                    return(
                        <TextArea />
                    )
            default:
                    return;

        }
    }
    render(){
        let Question = connect('src', actions)(
            ({src, setSrc}) => {
                return(
                    <div className="setting-question">
                        <label className="setting-question-label">{this.props.label}</label>
                        {this.getCorrectInput(this.props.type)}
                    </div>
                )
            })
        return(
            <Question/>
        )
    }
}
