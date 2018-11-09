import React, {Component} from 'react';
export default class Calendar extends Component{
    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            date: new Date()
        }
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeDay = this.changeDay.bind(this);
    }
    changeYear(val){
        this.setState({
            date: this.state.date.setYear(this.state.date.getFullYear() + val)
        })
    }
    changeDay(val){
        /* implement logic */
    }
    changeMonth(val){
        let month = this.state.date.getMonth()
        if(month > 1 && month < 12){
            this.setState({
                date: this.state.date.setMonth(this.state.date.getMonth() + val)
            })
        }else{
            this.changeYear(val)
        }
    }

    render(){
        return(
            <h2>Calendar</h2>
        )
    }
}
