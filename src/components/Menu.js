import React, { Component } from 'react';
import SerieSummary from './controlled/SerieSummary';
import MovieSummary from './controlled/MovieSummary';
import Calendar from './controlled/Calendar';
import Settings from './controlled/Settings';
import './style.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


export default class Menu extends Component{
    render(){
        return(
            <Router>
                    <div>
                        <nav>
                            <Link to="/">Series</Link>
                            <Link to="/movies/">movies</Link>
                            <Link to="/calendar/">Calendar</Link>
                            <Link to="/settings/">Settings</Link>
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
