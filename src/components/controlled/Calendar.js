import React, {Component} from 'react';
import moment from 'moment';
// import {TheMovieDB} from '../tools/RequestService';
// import Serie from './Serie';
import { getRange } from '../../tools/Utils';
import actions from '../../actions';
import {connect} from 'unistore/react';
export default class Calendar extends Component{
    constructor(props){
        super(props);
        // let moviedb = new TheMovieDB();
        this.state = {
            active: false,
            series:{},
            // moviedb: new TheMovieDB()
        };
    }
    render(){
        let currentMonth = [...getRange(1, moment().endOf('month').date())]
        let firstWeekDay = moment().startOf('month').day();
        let lastDayLastMonth = moment().subtract(1, 'month').endOf('month').date();
        let range = [
            ...getRange(lastDayLastMonth - firstWeekDay + 1, lastDayLastMonth), 
            ...currentMonth,
            ...getRange(1, currentMonth.length % 7 - 1)
        ];

        let Calendar = connect('seriesnames', actions)(
            ({seriesnames}) => {
                console.log(seriesnames)
                return(
                    <React.Fragment>
                        <h2>Calendar</h2>
                        <div className="calender-struct">
                            {range.map(val => <div className="calender-day-head"><span>{val}</span></div>)}
                        </div>
                    </React.Fragment>
                )
        })
        return(
            <Calendar />
        )
    }
}
