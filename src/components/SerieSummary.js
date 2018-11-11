import React, { Component } from 'react';
import './style.css';
import {actions} from '../store';
import {connect} from 'unistore/react';

export default class SerieSummary extends Component{
    render(){
        let Summary = connect('series', actions)(
            ({series}) => {
                return(
                    <React.Fragment>
                        <div className="src-struct">
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

