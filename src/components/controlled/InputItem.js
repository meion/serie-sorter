import React, { Component } from 'react';
import '../style.css';
import {connect} from 'unistore/react';
import actions from '../../actions';

export default class InputItem extends Component{
    render(){
        let InputItem = connect('src', actions)(
            ({src, setSrc}) => {
                return(
                    <div>
                        <button onClick={setSrc}>
                            <textarea value={src} disabled/>
                        </button>
                    </div>
                )
            })
        return(
            <InputItem />
        )
    }
}
