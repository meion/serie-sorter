import React, { Component } from 'react';
import './style.css';
// import Serie from './Serie';
import {getSeries} from '../tools/Utils'
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

        this.changeID = this.changeID.bind(this);
    }
    changeID(id){
        console.log(id);
    }
    async setSeries(){
        if(this.props.items.length > 0){
            let arr = getSeries(this.props.items, this.state.client);
            for(let item of arr){
                item.then(val =>{
                    if(val.key !== undefined){
                        this.setState({
                            series: [...this.state.series, val].sort((a,b) => {
                                const A = a.props.name
                                const B = b.props.name
                                return A > B ? 1 : B > A ? -1 : 0;
                            }),
                        }, () => this.setState({sorted:true}))
                    }
                })
            }
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

