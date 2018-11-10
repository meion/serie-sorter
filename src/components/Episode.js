import React, { Component } from 'react';
import './style.css';

export default class Episode extends Component{
    constructor(props){
        super(props);
        this.state = {
            number: this.props.number,
            season: this.props.season,
            name: this.props.name,
            src: this.props.src,
            dest: this.props.dest,
            id: this.props.id,
            episodeName:"",
            desc:"",
            rating:""
        }
        this.getEpisodeInfo = this.getEpisodeInfo.bind(this);
        this.getEpisodeInfo();
    }
    getEpisodeInfo(){
        this.props.client.fetch_episode(this.props.id, this.props.season, this.props.number)
            .then(val => {
                console.log(val)
                if(val.name){
                    this.setState({
                        ...this.state,
                        episodeName:val.name,
                        desc:val.overview,
                        rating: val.vote_average
                    })
                }
            })
            .catch(err => console.log(err))
    }
    render(){
        return(
            <div className="episode-struct">
                <div className="episode-name"><span><b>Episode</b></span> <span>{this.state.episodeName}</span></div>
                <span className="episode-desc-head  cursor-default">?
                        <span className="episode-desc">{this.state.desc}</span>
                </span>
            </div>

        )
    }
}
