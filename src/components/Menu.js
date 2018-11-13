import React, { Component } from 'react';
import SerieSummary from './SerieSummary';
import Calendar from './Calendar';
import './style.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


export default class Menu extends Component{
    render(){
        return(
            <Router>
                    <div>
                        <nav>
                            <Link to="/">Summary</Link>
                            <Link to="/calendar/">Calendar</Link>
                        </nav>
                        <div>
                            <Route path="/" exact component={SerieSummary} />
                            <Route path="/calendar/" component={Calendar} />
                        </div>
                    </div>
            </Router>
        )
    }
}
