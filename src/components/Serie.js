import React, { Component } from 'react';
import './style.css';
import Season from './Season';
import {getEpisodes} from '../tools/Utils'
import Setting from './Setting';
export default class Serie extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.name,
            id:this.props.id,
            desc:this.props.desc,
            seasons:this.AddSesons(this.props.content, this.props.id, this.props.name).sort((a,b) => {
                const A = a.props.season
                const B = b.props.season
                return A > B ? 1 : B > A ? -1 : 0;
            }),
            image:{
                fetched: true,
                imageURL: "https://image.tmdb.org/t/p/w500/" + this.props.banner
                // imageURL:"https://www.thetvdb.com" + this.props.banner.replace(/_cache/g, "/banners")
            },
            show:true,
            settings:{
                active:false
            },
            tvMaze:{}
        }
        this.AddSesons = this.AddSesons.bind(this);
        this.includes = this.includes.bind(this);
        this.Settings = this.Settings.bind(this);
        this.changeID = this.changeID.bind(this);
        
    }
    includes(newSeason, arr){
        let exists = false;
        arr.forEach((season)=>{
            if(newSeason === season.props.season){
                exists = true;
            }
        })
        return exists;
    }
    AddSesons(content, id, name){
        let arr = []
        content.forEach(element => {
            if(element === undefined) return;
            if(!this.includes(element.season, arr)){
                arr.push(<Season client={this.props.client} id={id} key={this.props.name+element.season+element.name} name={name} season={element.season} episodes={getEpisodes(name, element.season, content)}/>);
            }
        });
        // this.state.name = name;
        // this.state.tvMaze = new TvMaze(name);
        return arr;
    }
    changeID(id){
        this.props.client.fetch_serie_by_imdbid(id).then(val =>{
            if(val.tv_results.length){
                let newSerie = val.tv_results[0]; // get the first result.
                this.setState({
                    name: newSerie.name,
                    id:newSerie.id,
                    desc:newSerie.overview,
                    image:{
                        imageURL: "https://image.tmdb.org/t/p/w500/" + newSerie.poster_path
                    }
                })
            }
        })
        this.setState({
            settings: {...this.state.settings, active:!this.state.settings.active}
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.id !== prevState.id){
            let obj = this.props.content.map(val => {val.name = this.state.name; return val;});
            this.setState({
                seasons: this.AddSesons(obj, this.state.id, this.state.name).sort((a,b) => {
                    const A = a.props.season
                    const B = b.props.season
                    return A > B ? 1 : B > A ? -1 : 0;
                })
            })
        }
    }
    Settings(){
        this.setState({
            settings: {...this.state.settings, active:!this.state.settings.active}
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className="serie-struct">
                    <div className="img-container">
                        <h2 className={"top-left clickable"} onClick={this.Settings}>{this.state.image.imageURL ? "\u2699" : this.state.name}</h2>
                        <img src={this.state.image.imageURL} alt="never gonna show hopefully"/>
                        <div className="top-right">
                            <ul>
                                {this.state.show ? this.state.seasons : null}
                            </ul>
                        </div>
                        <div className="bottom-left">
                            <h2 className="serie-desc-head  cursor-default">?
                                <span className="serie-desc">{this.state.desc}</span>
                            </h2>
                        </div>
                    </div>
                </div>
                {this.state.settings.active ? 
                <div className={`Settings img-container ${this.state.settings.active ? "active" : ""}`}>
                    <h2>Settings for {this.state.name}</h2>
                    <h2 onClick={this.Settings}className="top-right clickable"> X </h2>
                    <ul>
                        <Setting value={this.state.id} setting="imdbid" label="Change imdbid" type="text" handleChange={this.changeID}/>
                    </ul>
                </div> 
                : null}
            </React.Fragment>
        )
    }
}
