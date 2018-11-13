import React, { Component } from 'react';
import '../style.css';
// import actions from '../../actions';
import actions from '../../actions';
import {connect} from 'unistore/react';

export default class SerieSummary extends Component{
    render(){
        let Summary = connect(['series', 'src'], actions)(
            ({series, src , client , addToSeries, getSeries, setDir , configSetDir}) => {
                if(!series.length){
                    // If we dont have any series loaded, check if we can load a source folder from the config-json.
                    configSetDir();
                }
                return(
                    <React.Fragment>
                        <div className="blocks src-struct">
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

