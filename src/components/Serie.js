import React, { Component } from 'react';
import './style.css';
import Season from './Season';
import {getEpisodes} from '../tools/Utils'
export default class Serie extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.name,
            id:"",
            seasons:this.AddSesons(this.props.content).sort((a,b) => {
                const A = a.props.season
                const B = b.props.season
                return A > B ? 1 : B > A ? -1 : 0;
            }),
            image:{
                fetched: true,
                imageURL:"https://www.thetvdb.com" + this.props.banner.replace(/_cache/g, "/banners")
            },
            show:true
        }
        // let test = new TvDB();
        this.AddSesons = this.AddSesons.bind(this);
        this.includes = this.includes.bind(this);
        
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
    AddSesons(content){
        let arr = []
        content.forEach(element => {
            if(element === undefined) return;
            if(!this.includes(element.season, arr)){
                arr.push(<Season key={this.props.name+element.season+element.name} name={this.props.name} season={element.season} episodes={getEpisodes(this.props.name, element.season, content)}/>);
            }
        });
        return arr;
    }
    activateSeasons(){
        var node = this.seasonRef.current;
        console.log(node)
        if(this.state.show){
            node.style.class += ' active';
        }else{
            node.style.class = node.className.replace("active", '');
        }
        this.setState({show: !this.state.show});

    }
    render(){
        return(
            <div className="serie-struct">
                <div className="img-container">
                    <h2 className="top-left" onClick={() => {this.setState({show : !this.state.show})}}>{this.state.name}</h2>
                    <img src={this.state.image.imageURL} alt="never gonna show hopefully"/>
                    <div className="top-right">
                        <ul>
                            {this.state.show ? this.state.seasons : null}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
