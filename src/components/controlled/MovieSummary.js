import React, { Component } from 'react';
import '../style.css';
// import actions from '../../actions';
import actions from '../../actions';
import {connect} from 'unistore/react';

export default class MovieSummary extends Component{
    render(){
        let Summary = connect(['series', 'src'], actions)(
            ({series, configSetDir}) => {
                if(!series.length){
                    // If we dont have any series loaded, check if we can load a source folder from the config-json.
                    configSetDir();
                }
                return(
                    <React.Fragment>
                        <div className="blocks src-struct">
                            <h2 className="heading-src">Movies structure</h2>
                            <div className="summary-struct">
                                <p>Movies will reside here</p>
                                {/* {series} */}
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

