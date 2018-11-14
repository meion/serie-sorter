import React, { Component } from 'react';
import '../style.css';
import {connect} from 'unistore/react';
import actions from '../../actions';
import Question from './Question';

export default class Settings extends Component{
    render(){
        let Settings = connect('src', actions)(
            ({src, setDir}) => {
                return(
                    <React.Fragment>
                        {/* <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/> */}
                        <Question setting="src_folder" label="Set sourcefolder" type="textarea"/>
                        <h2>General Settings</h2>
                        <Question setting="show_all_from_series" label="Show all episodes for each Serie?" type="radio"/>
                        <Question setting="cache_for_offline" label="Store serie/movie information locally?" type="radio"/>
                        <Question setting="remove_trash_files" label="Remove screen/sample etc. from source?" type="radio"/>
                        <Question setting="run_file_drone" label="Reorginaze source once a day?*" type="radio"/>
                        <Question setting="manual_import_route_active" label="Activate manual import of movie/serie?" type="radio"/>
                        <Question setting="deactivate_series_route" label="Deactivate series?" type="radio"/>
                        <Question setting="deactivate_movies_route" label="Deactivate movies?" type="radio"/>
                        <Question setting="deactivate_calendar_route" label="Deactivate calendar?" type="radio"/>
                        <Question setting="activate_services" label="Activate as service?**" type="radio"/>
                        <Question setting="activate_unfound_sources" label="Activate a route where user can manually redirect wrongfully names on series or movies?**" type="radio"/>
                        <Question setting="throttle_requests" label="Should the program fetch slowly?(good for bad connections)" type="radio"/>
                    </React.Fragment>
                )
            })
        return(
            <Settings />
        )
    }
}
