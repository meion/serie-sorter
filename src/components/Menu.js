import React, { Component } from 'react';
import InputItem from './InputItem';
import SerieSummary from './SerieSummary';
import './style.css';
import {flatten, extractAllmkv, getSeries} from '../tools/Utils';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import RequestService from '../tools/RequestService';
// const fs = window.require('fs');
// const path = require('path');


export default class Menu extends Component{
    constructor(){
        super();
        this.state = {
            dest : "",
            items: [],
            series:[],
            client: new RequestService()
        };
        this.src = React.createRef();
        this.setDir = this.setDir.bind(this);
        this.setDest = this.setDest.bind(this);
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
    setDir(id, value){
        var start = Date.now();
        if(id.toString() === "src"){
            flatten(value[0]).then(v =>{
                // console.log(v);
                let parsedArray = extractAllmkv(v, this.state.dest);
                let testitems = parsedArray.filter(val => val!==undefined);
                let series =  getSeries(testitems, this.state.client);
                for(let seriePromise of series){
                    seriePromise.then(serie =>{
                        if(serie.key !== undefined){
                            this.setState({
                                series:[...this.state.series, serie].sort((a,b) => {
                                    const A = a.props.name
                                    const B = b.props.name
                                    return A > B ? 1 : B > A ? -1 : 0;
                                })
                            },() => console.log(this.state))
                        }
                    })
                }
            })
        }
    }
    render(){
        let Default = () => (
            <React.Fragment>
                <div>Menu</div>
                <div id="blocks">
                    <div id="src-containers">
                        <InputItem label="Set src-folder" id="src" handleDirInfo={this.setDir}/>
                        <InputItem label="Set dest-folder" id="dest" handleDirInfo={this.setDest}/>
                    </div>
                </div>
            </React.Fragment>
        )
        return(
            <React.Fragment>
                <Default />
                <SerieSummary client={this.state.client} series={this.state.series}/>
            </React.Fragment>
        )
    }
}
