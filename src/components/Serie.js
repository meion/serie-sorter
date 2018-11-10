import React, { Component } from 'react';
import './style.css';
import Season from './Season';
import {getEpisodes} from '../tools/Utils'
import Setting from './Setting';
export default class Serie extends Component{
    constructor(props){
        super(props);
        console.log(props);
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
        console.log(this.state);
        this.AddSesons = this.AddSesons.bind(this);
        this.includes = this.includes.bind(this);
        this.Settings = this.Settings.bind(this);
        this.setNewImage = this.setNewImage.bind(this);
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
        if(this.state){
            if(this.state.id === this.props.id){
                console.log(this.state.id)
            }
        }
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
        this.props.client.search_for_serie(null, id, null).then(val =>{
            if(val[0].seriesName){
                this.setState({
                    name:val[0].seriesName,
                    id:val[0].id,
                    desc:val[0].overview
                }, () => {
                    this.setNewImage();
                })
            }
        })
        // window.scrollTo(0, this.state.settings.scrollPos);
        this.setState({
            settings: {...this.state.settings, active:!this.state.settings.active, scrollPos:0}
        })
    }
    setNewImage(){
        this.props.client.fetch_images(this.state.id)
            .then(val => {
                // console.log(val)
                if(val.data){
                    let newImg = val.data[0].thumbnail;
                    this.setState({
                        image:{
                            ...this.state.image,
                            imageURL: "https://www.thetvdb.com" + newImg.replace(/_cache/g, "/banners")
                        }
                    })
                }
            })
            .catch(err => console.log(err))
    }
    componentDidMount(){
        this.setState({
            // tvMaze: new TvMaze(this.state.name)
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
        let scrollPos = window.scrollY;
        console.log(scrollPos);
        // window.scrollTo(0, 0);
        this.setState({
            settings: {...this.state.settings, active:!this.state.settings.active, scrollPos: scrollPos}
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
