import React, { Component } from 'react';
import './style.css';
import Serie from './Serie';
import {getExclusiveNames, getContent} from '../tools/Utils'
import RequestService from '../tools/RequestService';


export default class SerieSummary extends Component{
    constructor(props){
        super(props)
        this.state = {
            series: [],
            mounted:false,
            client: new RequestService()
        }
        this.getSeries = this.getSeries.bind(this);
    }
    getSeries(items){
        let names = getExclusiveNames(items);
        let arr = [];
        for(let name of names){
            if(name !== undefined){
                arr.push(<Serie client={this.state.client} key={name} name={name} content={getContent(items, name)}/>);
            }
        }
        // this.state.series = arr;
        this.setState({series:arr})
    }
    getSeriesPromise(items){
        return new Promise((resolve, reject) =>{
            if(this.props.items.length > 0){
                resolve(this.getSeries(this.props.items))
            }else{
                reject(this.props.items)
            }
        })
    }
    componentDidMount(){
        this.setState({mounted:true})
    }
    componentDidUpdate(){
        if(this.state.series.length === 0 && this.props.items.length > 0 && this.state.mounted){
            setTimeout(()=>this.forceUpdate(), 500);
            this.getSeriesPromise(this.props.items)
                .then(()=> this.forceUpdate())
                .catch(() => {
                    console.log('No series yet');
                });
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className="src-struct">
                    <h2 className="heading-src">Series structure</h2>
                    <div className="summary-struct">
                        {this.state.series.map(value => value)}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

