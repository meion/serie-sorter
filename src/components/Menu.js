import React, { Component } from 'react';
import InputItem from './InputItem';
import SerieSummary from './SerieSummary';
import Calendar from './Calendar';
import './style.css';
import Links from './Links';
import {flatten, extractAllmkv, getContent} from '../tools/Utils';
import {TheMovieDB} from '../tools/RequestService';
import Serie from './Serie';
// const fs = window.require('fs');
// const path = require('path');


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
            client: new TheMovieDB(),
            serieloaded:false,
            site:"Serie Overview" // default TODO - cleaner
        };
        this.src = React.createRef();
        this.setDir = this.setDir.bind(this);
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
    setDir(id, value){
        if(id.toString() === "src"){
            flatten(value[0]).then(v =>{
                // console.log(v);
                let parsedArray = extractAllmkv(v, this.state.dest);
                let items = parsedArray.filter(val => val!==undefined);
                
                for(let item of items){
                    this.state.client.search_for_serie(item.name).then(val => {
                        if(val.results.length){
                            let serie = val.results[0];
                            // console.log(serie)
                             let newSerie = <Serie 
                                desc={serie.overview}
                                id={serie.id} 
                                banner={serie.poster_path} 
                                client={this.state.client} 
                                key={item.name} 
                                name={item.name} 
                                content={getContent(items, item.name)}
                            />
                            this.setState({
                                series: [...this.state.series, newSerie],
                            })
                        }
                    })
                    
                }
            })}}


        //         let series =  getSeries(testitems, this.state.client);
        //         this.setState({
        //             serieslength:series.length
        //         })
        //         for(let seriePromise of series){
        //             seriePromise.then(serie =>{
        //                 if(serie.key !== undefined){
        //                     this.setState({
        //                         series:[...this.state.series, serie].sort((a,b) => {
        //                             const A = a.props.name
        //                             const B = b.props.name
        //                             return A > B ? 1 : B > A ? -1 : 0;
        //                         })
        //                     },() => console.log(this.state))
        //                 }
        //                 this.setState({
        //                     loadedlength:this.state.loadedlength+1
        //                 })
                        
        //             })
        //         }
        //     })
        // }
    // }
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
        let Default = () => (
            <React.Fragment>
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
                <Links setLink={this.setLink} links={["Serie overview", "Calendar"]} />
                <Default />
                {/* implement store so that we wont have to refetch. */}
                {this.state.site === 'Calendar'? <Calendar items={this.state.items} />: <SerieSummary preloaded={this.state.serieloaded} client={this.state.client} series={this.state.series}/>}
                {/* <SerieSummary client={this.state.client} series={this.state.series}/> */}
            </React.Fragment>
        )
    }
}
