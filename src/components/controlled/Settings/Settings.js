import React, { Component } from 'react';
import '../../style.css';
import {connect} from 'unistore/react';
import actions from '../../../actions';
import Question from '../Question';
import GeneralSettings from './Routes/GeneralSettings';
import UserSettings from './Routes/UserSettings';
import MovieSerieSettings from './Routes/MovieSerieSettings';
import {BrowserRouter as Router, NavLink as Link, Route} from 'react-router-dom';
import NetworkSettings from './Routes/NetworkSettings';
import IntegrationSettings from './Routes/IntegrationSettings';

export default class Settings extends Component{
    render(){
        let Settings = connect('src', actions)(
            ({src, setDir}) => {
                return(
                    <Router>
                        <div className="left-menu-nav">
                            <nav className="menu-nav">
                                <Link activeStyle={{ color: 'gray' }} exact to="/settings/">General<br/> Settings</Link>
                                <Link activeStyle={{ color: 'gray' }} to="/settings/user/">User <br/>Settings</Link>
                                <Link activeStyle={{ color: 'gray' }} to="/settings/serie_movie/">Serie/Movie <br/>Settings</Link>
                                <Link activeStyle={{ color: 'gray' }} to="/settings/network/">Network <br/>Settings</Link>
                                <Link activeStyle={{ color: 'gray' }} to="/settings/integration/">Integration <br/>Settings</Link>
                                {/* <Link activeStyle={{ color: 'gray' }} to="/calendar/">Calendar</Link>
                                <Link activeStyle={{ color: 'gray' }} to="/settings/">Settings</Link>  */}
                            </nav>
                            <div className="settings-route">
                                <Route path="/settings/" exact component={GeneralSettings} />
                                <Route path="/settings/user/" component={UserSettings} />
                                <Route path="/settings/serie_movie/" component={MovieSerieSettings} />
                                <Route path="/settings/network/" component={NetworkSettings} />
                                <Route path="/settings/integration/" component={IntegrationSettings} />
                                {/*<Route path="/settings/" component={Settings} />
                                <Route path="/movies/" component={MovieSummary} /> */}
                            </div>
                        </div>
                    </Router>
                    // <React.Fragment>
                    //     {/* <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/> */}
                    //     <Question setting="src_folder" label="Set sourcefolder" type="textarea"/>
                    //     <h2>General Settings</h2>
                    //     <Question setting="show_all_from_series" label="Show all episodes for each Serie?" type="radio"/>
                    //     <Question setting="cache_for_offline" label="Store serie/movie information locally?" type="radio"/>
                    //     <Question setting="remove_trash_files" label="Remove screen/sample etc. from source?" type="radio"/>
                    //     <Question setting="run_file_drone" label="Reorginaze source once a day?*" type="radio"/>
                    //     <Question setting="manual_import_route_active" label="Activate manual import of movie/serie?" type="radio"/>
                    //     <Question setting="deactivate_series_route" label="Deactivate series?" type="radio"/>
                    //     <Question setting="deactivate_movies_route" label="Deactivate movies?" type="radio"/>
                    //     <Question setting="deactivate_calendar_route" label="Deactivate calendar?" type="radio"/>
                    //     <Question setting="activate_services" label="Activate as service?**" type="radio"/>
                    //     <Question setting="activate_unfound_sources" label="Activate a route where user can manually redirect wrongfully names on series or movies?**" type="radio"/>
                    //     <Question setting="throttle_requests" label="Should the program fetch slowly?(good for bad connections)" type="radio"/>
                    // </React.Fragment>
                )
            })
        return(
            <Settings />
        )
    }
}
