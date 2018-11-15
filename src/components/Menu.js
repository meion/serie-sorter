import React, { Component } from 'react';
import SerieSummary from './controlled/SerieSummary';
import MovieSummary from './controlled/MovieSummary';
import Calendar from './controlled/Calendar';
import Settings from './controlled/Settings/Settings';
import './style.css';
import {BrowserRouter as Router, NavLink as Link, Route} from 'react-router-dom';
import {connect} from 'unistore/react';
import actions from '../actions';



export default class Menu extends Component{
    render(){
        let Menu = connect('settings', actions)(
            ({settings}) => (
                <Router>
                    <div>
                        <nav className="menu-nav">
                            {settings.deactivate_series_route === false ? <Link activeStyle={{ color: 'gray' }} exact to="/">Series</Link>:null}
                            {settings.deactivate_movies_route === false ? <Link activeStyle={{ color: 'gray' }} to="/movies/">Movies</Link>:null}
                            {settings.deactivate_calendar_route === false ? <Link activeStyle={{ color: 'gray' }} to="/calendar/">Calendar</Link>:null}
                            <Link activeStyle={{ color: 'gray' }} to="/settings/">Settings</Link>
                        </nav>
                        <div>
                            <Route path="/" exact component={SerieSummary} />
                            <Route path="/calendar/" component={Calendar} />
                            <Route path="/settings/" component={Settings} />
                            <Route path="/movies/" component={MovieSummary} />
                        </div>
                    </div>
                 </Router>
            ))
        return(
            <Menu />
            // <Router>
            //         <div>
            //             <nav className="menu-nav">
            //                 <Link activeStyle={{ color: 'gray' }} exact to="/">Series</Link>
            //                 <Link activeStyle={{ color: 'gray' }} to="/movies/">Movies</Link>
            //                 <Link activeStyle={{ color: 'gray' }} to="/calendar/">Calendar</Link>
            //                 <Link activeStyle={{ color: 'gray' }} to="/settings/">Settings</Link>
            //             </nav>
            //             <div>
            //                 <Route path="/" exact component={SerieSummary} />
            //                 <Route path="/calendar/" component={Calendar} />
            //                 <Route path="/settings/" component={Settings} />
            //                 <Route path="/movies/" component={MovieSummary} />
            //             </div>
            //         </div>
            // </Router>
        )
    }
}
