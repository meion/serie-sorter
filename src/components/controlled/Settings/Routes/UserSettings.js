import React, { Component } from 'react';
import Question from '../../Question';
export default class GeneralSettings extends Component{
    render(){
        return(
            <React.Fragment>
                <Question setting="src_folder" label="Set sourcefolder" type="textarea"/>
                <Question setting="start_on_startup" label="Automatically start the service?" type="radio"/>
                {/* TODO - validate the email with the regexp provided by google. */}
                <Question setting="emal_to_ping" label="Enter mail to ping when new episode is released" type="text"/>
            </React.Fragment>
        )
    }
}
