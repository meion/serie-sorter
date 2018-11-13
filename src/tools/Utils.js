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
export function capitalizeFirstLetter(string) {
    let parsedString = string.split(' ').map((item) => {
        if(item !== undefined){
            if(parseInt(item, 10)){
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
export function getEpisodes(name, season, content){
    name = capitalizeFirstLetter(name).replace(/\./g, " ").replace(/'/g, "").trim();
    let arr = content.map((episode) =>{
        if(season === episode.season && episode.name.includes(name)){
            return episode;
        }
        return undefined;
    })
    arr = arr.filter(v => v!==undefined)
    if(!arr.length){
        console.log(name, season, content)
        if(name === "Rick and Morty"){
            console.log(name, season, content)
        }
    }
    return arr;
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
export function* getRange(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
export function getMovieObj(name, dest){
    name = name.split('/');
    name = name[name.length - 1];
    let obj = {
        name:""
    }
    let name_reg = /(^.*\.(mkv|avi|mp4)$)/;
    let serie_reg = /([\w(.| )]+?)(\.|\s|-)+?(S|s)([0-9]{1,})(E|e)([0-9]{1,})/;
    let match = name_reg.exec(name);
    let anotherMatch = serie_reg.exec(name);
    if(match !== null && anotherMatch === null){
        if(!match[0].toLowerCase().includes('sample')){
            let arr = name.split('.');
            let pn = []
            for(let i = 0; i < arr.length; i++){
                // todo cleaner
                if(arr[i].includes('1080p')){
                    i = 10^6;
                }else{
                    pn.push(arr[i])
                }
            }
            obj.name = pn.reduce((acc, curr) => acc+ " " +curr)
        }
    }
    return obj;

}
export function getSerieObj(name, dest){
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
/*
val : arr,
dest: file_loc,
type: serie or movie
*/
export function extractAllmkv(val, dest, type='serie'){
    let options = ".mkv";
    
    let arr = get_flat(val, options);
    if(type === 'serie'){
        arr = arr.map(val => getSerieObj(val, dest));
    }else{
        console.log('movie')
        arr = arr.map(val => getMovieObj(val, dest));
    }
    return arr;
}

export function getExclusiveNames(items){
    return removeDup(items.map(item => {
        if(item !== undefined){
            return item.name
        }
        return undefined;
    }))
    // .reduce((acc, curr)=>acc.includes(curr) ? acc : [...acc, curr], [])
}
function removeDup(items){
    let arr = [];
    for(let i = 0; i < items.length; i++){
        if(!existingValue(items[i], arr)){
            arr.push(items[i])
        }
    }
    return arr;
}
function existingValue(item, items){
    let existing = false;
    items.forEach(value => {
        if(value.includes(item) || item.includes(value)){
            existing = true;
        }
    })
    return existing;
}
export function getContent(items, name){
    name = name.replace(/\./g, " ").replace(/\(|\)/g, "").trim()
    if(name.includes('\'')){
        name = name.replace(/'/g, '');
    }
    return items.filter(item => {
        if(item !== undefined) return item.name.toUpperCase().includes(name.toUpperCase())
        return false;
    })
}
