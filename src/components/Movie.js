import React, { Component } from 'react';
import Setting from './Setting';

export default class Movie extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            name:this.props.name,
            id:this.props.id,
            desc:this.props.desc,
            image:{
                fetched: true,
                imageURL: "https://image.tmdb.org/t/p/w500/" + this.props.banner
            },
            show:true,
            settings:{
                active:false
            }
        }
        this.Settings = this.Settings.bind(this);
        this.changeID = this.changeID.bind(this);
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
    Settings(){
        this.setState({
            settings: {...this.state.settings, active:!this.state.settings.active}
        })
    }
    render(){
        return(
            // <div>pelo</div>
            <React.Fragment>
                <div className="movie-struct">
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
