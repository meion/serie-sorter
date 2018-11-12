import React, { Component } from 'react';
import './style.css';
import actions from '../actions';
import {connect} from 'unistore/react';
import InputItem from './InputItem';
export default class SerieSummary extends Component{
    render(){
        let Summary = connect('series', actions)(
            ({series, client , addToSeries, getSeries, setDir , blah}) => {
                return(
                    <React.Fragment>
                        <div className="blocks src-struct">
                            <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/>
                            <InputItem label="Set dest-folder" id="dest" handleDirInfo={this.setDest}/>
                            <h2 className="heading-src">Series structure</h2>
                            <div className="summary-struct">
                                {series}
                            </div>
                        </div>
                    </React.Fragment>
                )
        })
        return(
            <Summary />
        )
    }
}

