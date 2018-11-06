import React, { Component } from 'react';
import './style.css';
import Episode from './Episode';

export default class Season extends Component{
    constructor(props){
        super(props);
        // season is a string
        this.state = {
            name: this.props.name,
            season: this.props.season,
            episodes: this.removeDuplicate(this.props.episodes).sort((a,b) => {
                const A = a.episode
                const B = b.episode
                return A > B ? 1 : B > A ? -1 : 0;
            }),
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.removeDuplicate = this.removeDuplicate.bind(this);
    }
    removeDuplicate(items){
        let parsedArr = [];
        let add = true;
        items.forEach(item =>{
            if(item !== undefined){
                parsedArr.forEach(episode => {
                    if(item.episode === episode.episode){
                        add = false;
                    }
                })
                if(add){
                    parsedArr.push(item)
                }

            }
        });
        return parsedArr;
    }
    handleShow(){
        this.setState({show: !this.state.show})
    }
    render(){
        return(
            <li>
                <h3 onClick={this.handleShow}>{this.state.season}</h3>
                {this.state.show ? <ul>
                    {this.state.episodes.map((episode) =>{
                        if(episode !== undefined){
                            return (<Episode key={episode.name+episode.season+episode.episode} number={episode.episode} season={episode.season} name={episode.name} src={episode.src} dest={episode.dest} />);
                        }
                        return undefined;
                    })}
                </ul>: null}
            </li>
        )
    }

}