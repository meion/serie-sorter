import React from 'react';
import Serie from './components/Serie';
import {flatten, getExclusiveNames, extractAllmkv, getContent} from './tools/Utils'
const config = window.config;
const {dialog} = window.Remote;

export default (store) => {
    const addToSeries = (v, names) => {
        store.setState({
            series: [...store.getState().series, v]
        })
    }
    const getSeries = (state) => {
        return state.series;
    }
    const setSrc = (state) => {
        var string = dialog.showOpenDialog({properties: ['multiSelections', 'openDirectory']}) || "";
        if(string.length > 0){
            store.setState({
                src: string.reduce((acc, curr) => acc + ',\n' + curr)
            });
        setDir(state, string)
        }
    }
    const configSetDir = () => {
        setDir(store.getState(), [config.get('src')])
    } 
    const setDir = async function(state, srcDira){
        let srcDir = srcDira[0];
        let v = [];
        config.set('src', srcDir);
        // setSrc(srcDir);
        try{
            v = await flatten(srcDir);
        }catch(err){
            console.error(err)
        }
        let mkvArr = extractAllmkv(v, "").filter(val => val !== undefined)
        let names = getExclusiveNames(mkvArr);
        console.log(names)
        let responses = []
        for(let name of names){
            responses.push(state.client.search_for_serie(name));
        }
        for(let resp of responses){
            resp.then(result => {
                let serie = result.results[0];
                names.forEach(name => {
                    if(serie.name.includes(name)){
                        serie.name = name;
                    }
                })
                let newSerie = <Serie 
                    desc={serie.overview}
                    id={serie.id} 
                    banner={serie.poster_path} 
                    client={state.client} 
                    key={serie.name} 
                    name={serie.name} 
                    content={getContent(mkvArr, serie.name)}
                />
                addToSeries(newSerie, names)
            })
        }
    }
        return{
            addToSeries,
            getSeries,
            setDir,
            setSrc,
            configSetDir
        }
}
