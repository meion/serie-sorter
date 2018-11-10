import React, { Component } from 'react';
import './style.css';
import Episode from './Episode';

export default class Season extends Component{
    constructor(props){
        super(props);
        // season is a string
        console.log(props);
        this.state = {
            name: this.props.name,
            season: this.props.season,
            id:this.props.id,
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
    // componentDidUpdate(prevProps, prevState){
    //     if(this.state.id !== prevState.id){
    //         console.log(this.state.id);
    //     }
    // }
    handleShow(){
        this.setState({show: !this.state.show})
    }
    render(){
        return(
            <li>
                <h3 className="clickable" onClick={this.handleShow}>{this.state.season}</h3>
                {this.state.show ? <div className="season-episodes">
                    {this.state.episodes.map((episode) =>{
                        if(episode !== undefined){
                            return (<Episode client={this.props.client} id={this.props.id} key={episode.name+episode.season+episode.episode} number={episode.episode} season={episode.season} name={episode.name} src={episode.src} dest={episode.dest} />);
                        }
                        return undefined;
                    })}
                </div>: null}
            </li>
        )
    }

}
