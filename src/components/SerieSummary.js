import React, { Component } from 'react';
import './style.css';

export default class SerieSummary extends Component{
    constructor(props){
        super(props)
        this.state = {
            series: this.props.series,
            preloaded:this.props.preloaded,
            activated:false,
            showing:false,
            sorted:true,
            mounted:false,
            client: this.props.client
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.series !== this.props.series){
            if(!this.state.activated){
                this.setState({
                    activated:true
                }, () => this.forceUpdate())
            }
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className="src-struct">
                    <h2 className="heading-src">Series structure</h2>
                    <div className="summary-struct">
                        {(this.state.activated || this.state.preloaded) ? this.props.series.map(value => value): (!this.state.sorted && this.state.series.length > 0) ? <div> Loading series....</div> : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

