const path = require('path');
const fetch = window.fetch;
export async function fetch_get(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }
export default class TvDB{
    constructor(){
        this.test();
    }
    test(){
        var data = {
            apikey:"HAHTDKZQ5FWWZ8VR",
            userkey:"25T9UNL5DY3FIRXP",
            username:"lucasdahlgrenabn"
        };
        fetch('https://api.thetvdb.com/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }
    get_token(url, apikey, username, userkey){
        url = path.join(url, 'login');
        return new Promise((resolve, reject) =>{
            let options = this.construct_request(
                "POST",
                "no-cors",
                "no-cache",
                null,
                // "include",
                "application/json",
                // "follow",
                null,
                // "no-referrer",
                null,
                {
                    "apikey":apikey,
                    "userkey":userkey,
                    "username":username
                });
            this.make_request(url, options)
                .then((json) =>{
                    console.log(json)
                    resolve(json)
                })
                .catch(err => reject(err))
        })
    }
    construct_request(method, mode, cache, credentials, contentType, redirect, referrer, body){
        return {
            method: method, //GET, POST, PUT, DELETE
            mode: mode, // no-cors, cors, same-origin
            cache: cache, //default, no-cache, reload, force-cache, only-if-cached,
            credentials: credentials, // include, *same-origin, omit
            headers: {
                "Content-Type": contentType,// "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: redirect, // manual, *follow, error
            referrer: referrer, // no-referrer, *client
            body: body, // body data type must match "Content-Type" header
        }
    }
    make_request(url, options){
        console.log(options.body)
        return new Promise((resolve, reject) =>{
            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    }


}
