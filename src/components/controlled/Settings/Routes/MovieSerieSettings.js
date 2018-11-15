import React, { Component } from 'react';
import Question from '../../Question';
export default class MovieSerieSettings extends Component{
    render(){
        return(
            <React.Fragment>
                <Question setting="show_all_from_series" label="Show all episodes for each Serie?" type="radio"/>
                <Question setting="remove_trash_files" label="Remove screen/sample etc. from source?" type="radio"/>
            </React.Fragment>
        )
    }
}
