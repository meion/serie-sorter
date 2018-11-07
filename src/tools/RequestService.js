const fetch = window.fetch;
const fs = window.fs;
export async function fetch_get(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }
export default class TvDB{
    constructor(){
        this.state = {
            token: "",
            header: ""
        }
        this.fetch_token("https://api.thetvdb.com/login", "HAHTDKZQ5FWWZ8VR","lucasdahlgrenabn","25T9UNL5DY3FIRXP");
    }
    async fetch_images(id){
        let url = `https://api.thetvdb.com/series/${id}/images//query?keyType=poster`
        return new Promise((resolve, reject) => {
            this.fetch_get_url(url)
                .then(val => {
                    // var file = fs.createWriteStream("externalFiles/file.jpg");
                    // val.pipe(file);
                    // cont dest = fs.createWriteStream('./')
                    // TODO - preload path
                    // const dest = fs.createWriteStream(`./${val.data[0].thumbnail}`);
                    // val.body.pipe(dest);
                    console.log(val.data);
                    resolve(val)
                })
                .catch(err => reject(err))
        }
        );}
    async search_for_serie(name, imdbId, zap2itID){
        let url = "https://api.thetvdb.com/search/series?name=" + name.replace(/\s/g, "+");
        return new Promise((resolve, reject) => {
            this.fetch_get_url(url)
                .then(val => resolve(val))
                .catch(err => reject(err))
        });}
    async fetch_get_url(url){
        return fetch(url, {
            method:'GET',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Accept-Language': 'en'
            }})
            .then(res => res.json())
    }
    async fetch_token(url, apikey, username, userkey){
        let data = {
            "apikey":apikey,
            "userkey":userkey,
            "username":username
        };
        return await this.POST_request(data, url)
            .then(val => {
                this.state.token = val.token;
                this.state.header = `Bearer ${val.token}`;
            })
            .catch(err => console.err(err))
    }
    POST_request(body, url, authString=null){
        return new Promise((resolve, reject) =>{
            fetch(url, {
                method:"POST",
                headers: {
                    Authorization: authString,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)})
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    resolve(json);
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
