import React, { Component } from 'react';
import './style.css';
import Serie from './Serie';
import {getExclusiveNames, getContent, parseSerieSearch} from '../tools/Utils'
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
            if(name){
                arr.push(
                    new Promise((resolve, reject) => {
                        this.state.client.search_for_serie(name).then(val => {
                            if(val.data){
                                let banner = val.data[0].thumbnail;
                                console.log('resolving')
                                resolve(<Serie banner={banner} client={this.state.client} key={name} name={name} content={getContent(items, name)}/>)
                            }
                            resolve(val)
                        })
                    })
                );
            }
        }
        return Promise.all(arr);
    }
    setSeries(){
        if(this.props.items.length > 0){
            this.getSeries(this.props.items)
                .then(val => {
                    this.setState({
                        series: val.filter((val) => val.key !== undefined)
                    })
                    console.log(val)
                })
                .catch(err => console.log(err))
        }
    }
    componentDidMount(){
        this.setState({mounted:true})
    }
    componentDidUpdate(){
        if(this.state.series.length === 0 && this.props.items.length > 0 && this.state.mounted){
            console.log('hello')
            this.setSeries()
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

