import createStore from 'unistore';
import React from 'react';
import Serie from './components/Serie';
import {flatten, getExclusiveNames, extractAllmkv, getContent} from './tools/Utils'
import RequestService from './tools/RequestService';
const config = window.config;

export const actions = store => ({
    addToSeries: ({series}, serie) => ({series: series.push(serie)}),
    blah:() => console.log('hello'),
    getSeries:({series}) => console.log(series),
    async setDir({series, src, client}, value, srcDira){
        let srcDir = srcDira[0];
        let v = [];
        config.set('src', srcDir);
        try{
            v = await flatten(srcDir);
        }catch(err){
            console.error(err)
        }
        let arr = [...store.getState().series];
        // console.log(store.getState().series)¨
        let mkvArr = extractAllmkv(v, "").filter(val => val !== undefined)
        let names = getExclusiveNames(mkvArr);
        let responses = []
        for(let name of names){
            // console.log(name)
            responses.push(client.search_for_serie(name));
        }
        Promise.all(responses).then(resp => {
            let arr = [];
            for(let response of resp){
                let serie = response.results[0];
                let newSerie = <Serie 
                    desc={serie.overview}
                    id={serie.id} 
                    banner={serie.poster_path} 
                    client={client} 
                    key={serie.name} 
                    name={serie.name} 
                    content={getContent(mkvArr, serie.name)}
                />
                arr.push(newSerie)
            }
            store.setState({
                series: arr
            })
        })
    }})
export default createStore({
    series:[],
    src:"",
    client: new RequestService()
  });
