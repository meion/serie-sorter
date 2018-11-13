import React, { Component } from 'react';
import SerieSummary from './controlled/SerieSummary';
import MovieSummary from './controlled/MovieSummary';
import Calendar from './controlled/Calendar';
import Settings from './controlled/Settings';
import './style.css';
import {BrowserRouter as Router, NavLink as Link, Route} from 'react-router-dom';


export default class Menu extends Component{
    render(){
        return(
            <Router>
                    <div>
                        <nav className="menu-nav">
                            <Link activeStyle={{ color: 'gray' }} exact to="/">Series</Link>
                            <Link activeStyle={{ color: 'gray' }} to="/movies/">movies</Link>
                            <Link activeStyle={{ color: 'gray' }} to="/calendar/">Calendar</Link>
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
        )
    }
}
