import React, { Component } from 'react';
import InputItem from './InputItem';
import SerieSummary from './SerieSummary';
import './style.css';
import {flatten, extractAllmkv} from '../tools/Utils';
// const fs = window.require('fs');
// const path = require('path');


export default class Menu extends Component{
    constructor(){
        super();
        this.state = {
            dest : "",
            items: []
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
                this.setState({
                    items: parsedArray.sort((a,b) =>{
                        const A = a.name.toUpperCase();
                        const B = b.name.toUpperCase();
                        return A > B ? 1 : B > A ? -1 : 0;
                    })
                })
                console.log(`Time elapsed: ${(Date.now() - start)/1000}`)
            })
        }
    }
    render(){
        return(
            <React.Fragment>
                <div>Menu</div>
                <div id="blocks">
                <div id="src-containers">
                    <InputItem label="Set src-folder" id="src" handleDirInfo={this.setDir}/>
                    <InputItem label="Set dest-folder" id="dest" handleDirInfo={this.setDest}/>
                </div>
                <SerieSummary items={this.state.items}/>

                </div>
            </React.Fragment>
        )
    }
}
