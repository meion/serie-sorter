import React, { Component } from 'react';
import Question from '../../Question';
export default class GeneralSettings extends Component{
    render(){
        return(
            <React.Fragment>
                <Question setting="start_on_startup" label="Automatically start the service?" type="radio"/>
            </React.Fragment>
        )
    }
}
