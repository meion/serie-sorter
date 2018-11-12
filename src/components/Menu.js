import React, { Component } from 'react';
import SerieSummary from './SerieSummary';
import Calendar from './Calendar';
import './style.css';
import RequestService from '../tools/RequestService';
import actions from '../actions'
import {connect} from 'unistore/react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


export default class Menu extends Component{
    constructor(){
        super();
        this.state = {
            dest : "",
            items: [],
            serieslength:0,
            loadedlength:0,
            series:[],
            done:false,
            client: new RequestService(),
            serieloaded:false,
            site:"Serie Overview" // default TODO - cleaner
        };
        this.src = React.createRef();
    }
    render(){
        const Menu = connect('series', actions)(
            ({series, client , addToSeries, getSeries, setDir , blah}) => {
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
        )
        return(
            <React.Fragment>
                <Menu />
            </React.Fragment>
        )
    }
}
