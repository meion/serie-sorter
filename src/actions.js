import React from 'react';
import Serie from './components/Serie';
import Movie from './components/Movie';
import {flatten, getExclusiveNames, extractAllmkv, getContent} from './tools/Utils'
const config = window.config;
const {dialog} = window.Remote;

export default (store) => {
    const addToSeries = (v, names) => {
        store.setState({
            series: [...store.getState().series, v]
        })
    }
    const changeSetting = ({settings},v, e) => {
        // TODO - init settings state
        console.log(v, e.target.value)
        store.setState({
            ...settings,
            [name] : v  
        })
    }
    const addToMovies = (v, names) => {
        store.setState({
            movies: [...store.getState().movies, v]
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
        setDir(store.getState(), [config.get('src')]) // auto load series
        setDirMovie(store.getState(), [config.get('src')]) // auto load movies
    }
    const setDirMovie = async function(state, srcDira){
        let srcDir = srcDira[0];
        let v = [];
        //src set in sere function
    }
    const constructMovies = async function(movies){
        let state = store.getState();
        let respones = [];
        console.log(movies)
        for(let name of movies){
            respones.push(state.client.search_for_movie(name))
        }
        for(let resp of respones){
            resp.then(val => {
                if(val.total_results > 0){
                    let obj = val.results[0];
                    console.log(obj.original_title)
                    let newMovie = <Movie
                        name={obj.original_title}
                        key={obj.original_title}
                        id={obj.id}
                        desc={obj.overview}
                        banner={obj.poster_path} />
                    addToMovies(newMovie)
                }
            })
        }
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
        let movies = extractAllmkv(v,"","movie").filter(val => val.name.length > 0);
        constructMovies(movies);
        let names = getExclusiveNames(mkvArr);
        console.log(names)
        let responses = []
        for(let name of names){
            responses.push(state.client.search_for_serie(name));
        }
        for(let resp of responses){
            resp.then(result => {
                if(result !== undefined){
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
                }
            })
        }
    }
        return{
            addToSeries,
            addToMovies,
            getSeries,
            setDir,
            setSrc,
            configSetDir,
            changeSetting
        }
}
