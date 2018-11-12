import React, {Component} from 'react';
import moment from 'moment';
// import {TheMovieDB} from '../tools/RequestService';
// import Serie from './Serie';
// import { getContent } from '../tools/Utils';
import actions from '../actions';
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
        // this.test = this.test.bind(this);
        // this.test();
    }
    // test(){
    //     console.log(this.props.items);
    //     let name = "South Park";
    //     this.state.moviedb.search_for_serie(name).then(val => {
    //         if(val.results.length){
    //             let serie = val.results[0];
    //             // console.log(serie)
    //              let testserie = <Serie 
    //                 desc={serie.overview}
    //                 id={serie.id} 
    //                 banner={serie.poster_path} 
    //                 client={this.state.moviedb} 
    //                 key={name} 
    //                 name={name} 
    //                 content={getContent(this.props.items, name)}
    //             />
    //             this.setState({
    //                 series: testserie,
    //                 active:true
    //             })
    //         }
    //     })
    // }

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
            // <React.Fragment>
            //     {this.state.active ? this.state.series : null}
            //     <h2>Calendar</h2>
            //     <div className="calender-struct">
            //         {range.map(val => <div className="calender-day-head"><span>{val}</span></div>)}
            //     </div>
            // </React.Fragment>
        )
    }
}
function* getRange(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
