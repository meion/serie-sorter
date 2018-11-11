import React, { Component } from 'react';
import InputItem from './InputItem';
import SerieSummary from './SerieSummary';
import Calendar from './Calendar';
import './style.css';
import Links from './Links';
import {flatten, extractAllmkv, getContent, getExclusiveNames} from '../tools/Utils';
import RequestService from '../tools/RequestService';
import Serie from './Serie';
import {actions} from '../store';
import {connect} from 'unistore/react';
const config = window.config;

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
        this.setDest = this.setDest.bind(this);
        this.setLink = this.setLink.bind(this);
    }
    setLink(e){
        let link = e.target.innerHTML;
        this.setState({
            site:link
        })
    }
    setDest(id, value){
        this.setState({
            dest: value[0],
            items: this.state.items.map(item=>{
                if(item !== undefined){
                    item.dest = value[0]
                }
                return item;
            })
        },() => console.log(this.state));
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state){
            if(this.state.loadedlength === this.state.serieslength && !this.state.done){
                this.setState({
                    serieloaded:true,
                    done:true
                })
            }
        }
    }
    render(){
        const Default = connect('series', actions)(
            ({series, client , addToSeries, getSeries, setDir , blah}) => {
                return(
                    <React.Fragment>
                        <div id="blocks">
                            <div id="src-containers">
                                <button onClick={getSeries} />
                                <InputItem label="Set src-folder" id="src" handleDirInfo={setDir}/>
                                <InputItem label="Set dest-folder" id="dest" handleDirInfo={this.setDest}/>
                            </div>
                        </div>
                        <SerieSummary preloaded={this.state.serieloaded} client={client} series={series}/>
                    </React.Fragment>
                )
        })
        return(
            <React.Fragment>
                <Links setLink={this.setLink} links={["Serie overview", "Calendar"]} />
                <Default/>
                {/* {this.state.site === 'Calendar'? <Calendar items={this.state.items} />: <SerieSummary preloaded={this.state.serieloaded} client={this.state.client} series={this.state.series}/>} */}
            </React.Fragment>
        )
    }
}
