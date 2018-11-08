import React, {Component} from 'react';
export default class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            error:{
                triggered:false,
                msg:""
            }
        }
        this.SendValue = this.SendValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inputRef = React.createRef();
    }
    handleChange(){
        var node = this.inputRef.current;
        if(!node.value.length) return
        // if(!Number.isInteger(parseInt(node.value,10))){
        // if(isNaN(node.value)){
        //     console.log(node.value)
        //     this.setState({
        //         error: {
        //             ...this.state.error,
        //             msg:"not a valid number",
        //             triggered:true
        //         }
        //     })
        // }else{
            this.setState({
                error:{}
            })
        // }
    }
    SendValue(e){
        var node = this.inputRef.current;
        if(!this.state.error.triggered){
            this.props.handleChange(node.value);
        }
    }
    render(){
        let helptext = "https://www.imdb.com/title/{id}/";
        return(
            <li>
                <label>{this.props.label}</label>
                <input onChange={this.handleChange} placeholder={this.props.value} ref={this.inputRef}type={this.props.type} id={this.props.setting}/>
                {this.state.error.triggered ? <span>{this.state.error.msg}</span> : null}
                <button className="settings-btn" onClick={this.SendValue}>Set {this.props.setting}</button>
                <span className="settings-help-head  cursor-default">?
                        <span className="settings-help">{helptext}</span>
                </span>
            </li>
        )
    }
}
