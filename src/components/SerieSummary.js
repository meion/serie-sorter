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
            sorted:false,
            showing:false,
            mounted:false,
            client: new RequestService()
        }
        this.getSeries = this.getSeries.bind(this);
        this.sortSeries = this.getSeries.bind(this);
    }
    getSeries(items){
        let names = getExclusiveNames(items);
        let arr = [];
        for(let name of names){
            if(name){
                arr.push(
                    new Promise((resolve, reject) => {
                        this.state.client.search_for_serie(name).then(val => {
                            if(val.images.data){
                                let banner = val.images.data[0].thumbnail;
                                resolve(<Serie id={val.id} banner={banner} client={this.state.client} key={name} name={name} content={getContent(items, name)}/>)
                            }
                            resolve(val)
                        })
                    })
                );
            }
        }
        return arr;
    }
    async setSeries(){
        if(this.props.items.length > 0){
            let arr = this.getSeries(this.props.items);
            arr.forEach(async (item) => {
                let res = await item;
                if(res.key !== undefined){
                    this.setState({
                        series: [...this.state.series, res].sort((a,b) => {
                            console.log(a)
                            const A = a.props.name
                            const B = b.props.name
                            return A > B ? 1 : B > A ? -1 : 0;
                        }),
                    }, () => this.setState({sorted:true}))
                }
            })
        }
    }
    componentDidMount(){
        this.setState({mounted:true})
    }
    componentDidUpdate(){
        if(this.state.series.length === 0 && this.props.items.length > 0 && this.state.mounted){
            this.setSeries()
        }else if(this.state.series.length > 0 && !this.state.showing && this.state.sorted){
            this.setState({
                showing: true
            }, () => this.forceUpdate());
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className="src-struct">
                    <h2 className="heading-src">Series structure</h2>
                    <div className="summary-struct">
                        {this.state.sorted ? this.state.series.map(value => value): (!this.state.sorted && this.state.series.length > 0) ? <div> Loading series....</div> : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

