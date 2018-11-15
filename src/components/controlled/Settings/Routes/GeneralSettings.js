import React, { Component } from 'react';
import Question from '../../Question';
export default class GeneralSettings extends Component{
    render(){
        return(
            <React.Fragment>
                <Question setting="cache_for_offline" label="Store serie/movie information locally?" type="radio"/>
                <Question setting="run_file_drone" label="Reorginaze source once a day?*" type="radio"/>
                <Question setting="manual_import_route_active" label="Activate manual import of movie/serie?" type="radio"/>
                <Question setting="deactivate_series_route" label="Deactivate series?" type="radio"/>
                <Question setting="deactivate_movies_route" label="Deactivate movies?" type="radio"/>
                <Question setting="deactivate_calendar_route" label="Deactivate calendar?" type="radio"/>
                <Question setting="activate_services" label="Activate as service?**" type="radio"/>
                <Question setting="activate_unfound_sources" label="Activate a route where user can manually redirect wrongfully names on series or movies?**" type="radio"/>
            </React.Fragment>
        )
    }
}
