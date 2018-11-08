import React, { Component } from 'react';
import Style from './style.css';
import Season from './Season';
import {getEpisodes, parseSerieSearch} from '../tools/Utils'
import {fetch_get} from '../tools/RequestService';
import TvDB from '../tools/RequestService';
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
                fetched: false,
                real:false,
                imageURL:""
            },
            show:true
        }
        // let test = new TvDB();
        console.log(this.props.banner)
        this.imgRef = React.createRef();
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
    componentDidUpdate(prevProps, prevState){
        if(this.state.id !== prevState.id && !this.state.image.real){
            console.log('hello')
            this.props.client.fetch_images(this.state.id)
                .then(val => {
                    console.log('hello2')
                    console.log(val.data[0]);
                    // console.log(val)
                    this.setState({
                        image:{
                            ...this.state.image,
                            imageURL2:val.data[0].thumbnail,
                            real:true
                        }
                    })
                })
                .catch(err => console.err)
        }
    }
    componentDidMount(){  
        fetch_get("http://www.splashbase.co/api/v1/images/1").then((value) =>{
            // console.log(value);
            this.setState({
                image:{
                    fetched:true,
                    imageURL: value.url
                }
            }, () =>{
                var node = this.imgRef.current;
                node.style.width = "100%";
                // assume something like 
                // console.log(Math.round(node.height/10)*10)
                // console.log(Math.round(node.width/10)*10)
            })
        }).catch((err) => {
            console.error(err)
        });
    }
    render(){
        return(
            <div className="serie-struct">
                <div className="img-container">
                    <h2 className="top-left" onClick={() => this.setState({show: !this.state.show})}>{this.state.name}</h2>
                    {this.state.image.fetched ? <img src={this.state.image.imageURL} ref={this.imgRef}alt="never gonna show hopefully"/> : null}
                    {this.state.image.real ? <img src={this.state.image.imageURL2} ref={this.imgRef}alt="never gonna show hopefully"/> : null}
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
