import React from 'react';
import Serie from '../components/Serie';
const fs = window.fs;
const path = require('path');

function getfiles(srcDir){
    return new Promise((resolve, reject) =>{
        fs.readdir(srcDir, (err, files) =>{
            if(err) reject(err);
            resolve(files);
        })
    })
}
function filteritem(item, options){
    let parseditem;
    if(Array.isArray(item)){
        parseditem = item.filter((value) =>{
            return value.includes(options)
        });
    }else{
        parseditem = item.includes(options) ? item : null;
    }
    return parseditem;
}
function get_flat(val, options){
    let arr = [];
    for(let item of val){
        if(Array.isArray(item)){
            item = get_flat(item, options);
            arr = arr.concat(item)
        }else if(item !== null){
            arr.push(item)
        }
    }
    return filteritem(arr, options);
}
function getFilePromise(file){
    return new Promise((resolve,reject)=>{
        fs.lstat(file, (err, stats) =>{
            if(err) reject(err)
            if(stats.isDirectory()){
                resolve(flatten(file))
            }else if(stats.isFile()){
                resolve(file)
            }
        })
    })
}
function isCountryCode(string){
    return string.length === 2 ? true : false;
}
function capitalizeFirstLetter(string) {
    let parsedString = string.split(' ').map((item) => {
        if(item !== undefined){
            if(parseInt(item, 10) || isCountryCode(item)){
                item = undefined   
            }else{
                item = item.toString().charAt(0).toUpperCase() + item.slice(1)
            }
        }
        return item;
        }   
    );
    return parsedString.reduce((acc, curr) => {
        if(curr !== undefined) return acc + " " + curr
        return acc
    });
}
export function parseSerieSearch(data, seriename){
    let parsedserie = {
        newest:{},
        active:{},
        network:{}
    };
    data.forEach(serie => {
        parsedserie.active = getActive(parsedserie.active, serie);
        parsedserie.newest = getNewest(parsedserie.newest, serie);
        parsedserie.network = getNetwork(parsedserie.network, serie);
    });
    return getMostLikely(parsedserie, seriename);
}
function getMostLikely(serie, name){
    if(serie.newest === serie.active && serie.newest === serie.network && serie.active === serie.network){
        if(serie.newest.seriesName === name){
            return serie.newest;
        }else if(serie.active.seriesName === name){
            return serie.active;
        }
    }else if(serie.newest === serie.active){
        if(serie.newest.seriesName === name){
            return serie.newest;
        }
        return serie.active;
    }
    return serie.network.network !== undefined ? serie.network : serie.newest;
}
function getNetwork(serie, newSerie){
    let likelynetworks = ["The CW", "Showtime", "Destination America", "Netflix", "ABC (US)", "FXX", "Starz!", "FOX (US)", "AMC", "CBS", "Comedy Central (US)", "TBS"]
    if(newSerie.network === undefined){
        return serie
    }else if(serie.network === undefined){
        return newSerie
    }
    if(likelynetworks.includes(serie.network) && likelynetworks.includes(newSerie.network)){
        return getNewest(serie, newSerie);
    }else if(likelynetworks.includes(serie.network)){
        return serie
    }
    return newSerie;
}
function getNewest(serie, newSerie){
    if(newSerie.firstAired === undefined){
        return serie
    }else if(serie.firstAired === undefined){
        return newSerie
    }
    // let {year, month, day} = serie.firstAired.split("-").map(val => parseInt(val, 10));
    let [year , month , day] = serie.firstAired.split("-").map(val => parseInt(val, 10));
    let [newYear, newMonth, newDay] = newSerie.firstAired.split("-").map(val => parseInt(val, 10));
    let outcomeYear = newYear - year;
    let outcomeMonth = newMonth - month;
    let outcomeDay= newDay - day;
    if(outcomeYear > 0){
        return newSerie;
    }else if(outcomeYear === 0 && outcomeMonth > 0){
        return newSerie;
    }else if(outcomeYear === 0 && outcomeMonth === 0 && outcomeDay > 0){
        return newSerie;
    }
    return serie;
}
function getActive(serie, newSerie){
    if(serie.status === undefined || newSerie.status === undefined){
        if(newSerie !== undefined){
            if(newSerie.status.toString() === "Continuing"){
                return newSerie
            }
        }
        return {};
    }else{
        if(serie.status.toString() === "Continuing" && newSerie.status.toString() === "Continuing"){
            return getNewest(serie, newSerie);
        }else if(serie.status.toString() === "Continuing"){
            return serie;
        }else if(newSerie.status.toString() === "Continuing"){
            return newSerie;
        }
        return {}
    }
}
export function getEpisodes(name, season, content){
    return content.map((episode) =>{
        if(season === episode.season && name === episode.name){
            return episode;
        }
        return undefined;
    })
}
export function getSeries(items, client){
        let names = getExclusiveNames(items).filter(name => name!==undefined);
        let arr = [];
        for(let name of names){
            if(name){
                arr.push(
                    new Promise((resolve, reject) => {
                        client.search_for_serie(name).then(val => {
                            if(val.images.data){
                                let banner = val.images.data[0].thumbnail;
                                resolve(<Serie desc={val.desc}id={val.id} banner={banner} client={client} key={name} name={name} content={getContent(items, name)}/>)
                            }
                            resolve(val)
                        })
                    })
                );
            }
        }
        return arr;
    }
export function beutifyname(name, dest){
    let name_reg = /([\w(.| )]+?)(\.|\s|-)+?(S|s)([0-9]{1,})(E|e)([0-9]{1,})/;
    let match = name_reg.exec(name);
    if(match !== null){
        const obj = {
            episode :match[6],
            season:match[4],
            name : capitalizeFirstLetter(match[1].replace(/\./g, " ").replace(/\(|\)/g, "")),
            src : name,
            dest: dest
        }
        return obj;
    }
    return undefined;
}
export function flatten(src){
    let arr =[]
    return getfiles(src).then(files => {
        for(let file of files){
            arr.push(getFilePromise(path.join(src, file)))
        }
        return Promise.all(arr);
    }).then(v => {
        return v;
    })
}
export function extractAllmkv(val, dest){
    let options = ".mkv";
    let arr = get_flat(val, options);
    arr = arr.map(val => beutifyname(val, dest));
    return arr;
}

export function getExclusiveNames(items){
    return items.map(item => {
        if(item !== undefined){
            return item.name
        }
        return undefined;
    }).reduce((acc, curr)=>acc.includes(curr) ? acc : [...acc, curr], [])
}
export function getContent(items, name){
    return items.filter(item => {
        if(item !== undefined) return item.name === name
        return false;
    })
}
