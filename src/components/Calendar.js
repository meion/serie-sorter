import React, {Component} from 'react';
import moment from 'moment';
export default class Calendar extends Component{
    // constructor(props){
    //     super(props);
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
        return(
            <React.Fragment>
                <h2>Calendar</h2>
                <div className="calender-struct">
                    {range.map(val => <div>{val}</div>)}
                </div>
            </React.Fragment>
        )
    }
}
function* getRange(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
