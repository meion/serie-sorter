import React, { Component } from 'react';
import '../style.css';
// import actions from '../../actions';
import actions from '../../actions';
import {connect} from 'unistore/react';

export default class MovieSummary extends Component{
    render(){
        let Summary = connect(['movies', 'src'], actions)(
            ({movies}) => {
                return(
                    <React.Fragment>
                        <div className="blocks src-struct">
                            <div className="summary-struct">
                                {movies}
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

