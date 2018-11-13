import React, { Component } from 'react';
import '../style.css';
import {connect} from 'unistore/react';
import actions from '../../actions';
import InputItem from './InputItem';

export default class Settings extends Component{
    render(){
        let Settings = connect('src', actions)(
            ({src, setDir}) => {
                return(
                    <React.Fragment>
                        <h2>Settings</h2>
                        <label>Source-folder</label>
                        <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/>
                    </React.Fragment>
                )
            })
        return(
            <Settings />
        )
    }
}
