import React, { Component } from 'react';
import '../style.css';
import {connect} from 'unistore/react';
import actions from '../../actions';
import InputItem from './InputItem';
import Question from './Question';

export default class Settings extends Component{
    render(){
        let Settings = connect('src', actions)(
            ({src, setDir}) => {
                return(
                    <React.Fragment>
                        <label>Source-folder</label>
                        <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/>
                        <Question setting="show_all_from_series" label="Show all episodes for each Serie?" type="radio"/>
                    </React.Fragment>
                )
            })
        return(
            <Settings />
        )
    }
}
