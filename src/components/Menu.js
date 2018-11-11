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
        if(config.has('src')){
            this.setDir("src", [config.get('src').toString()])
        }
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
    setDir(id, value, src){
        console.log(id, value)
        if(id.toString() === "src"){
            flatten(value[0]).then(v =>{
                console.log(v);
                if(!config.has('src')){
                    config.set('src', src)
                }
                let parsedArray = extractAllmkv(v, this.state.dest);
                let items = getExclusiveNames(parsedArray.filter(val => val!==undefined));
                for(let name of items){
                    this.state.client.search_for_serie(name).then(val => {
                        if(val){
                            let serie = val.results[0];
                            // console.log(serie)
                             let newSerie = <Serie 
                                desc={serie.overview}
                                id={serie.id} 
                                banner={serie.poster_path} 
                                client={this.state.client} 
                                key={name} 
                                name={name} 
                                content={getContent(parsedArray, name)}
                            />
                            this.setState({
                                series: [...this.state.series, newSerie].sort((a,b) => {
                                    let A = a.props.name;
                                    let B = b.props.name;
                                    return A > B ? 1 : B > A ? -1 : 0;
                                }),
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
        const Default2 = connect('series', actions)(
            ({series, addToSeries, getSeries, blah}) => {
                return(<div>hello</div>)
        })
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
                <Default2 />
                {/* implement store so that we wont have to refetch. */}
                {this.state.site === 'Calendar'? <Calendar items={this.state.items} />: <SerieSummary preloaded={this.state.serieloaded} client={this.state.client} series={this.state.series}/>}
                {/* <SerieSummary client={this.state.client} series={this.state.series}/> */}
            </React.Fragment>
        )
    }
}
