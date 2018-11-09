export default class httpClient{
    constructor(){
        this.state = {
            token: "",
            header: ""
        }
        this.fetch_token("https://api.thetvdb.com/login", "HAHTDKZQ5FWWZ8VR","lucasdahlgrenabn","25T9UNL5DY3FIRXP");
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
    async fetch_get_url(url){
        return fetch(url, {
            method:'GET',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Accept-Language': 'en'
            }})
            .then(res => res.json())
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
