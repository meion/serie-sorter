export default class httpClient{
    constructor(){
        this.state = {
            // token: "",
            token:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDE5Mzg4MTQsImlkIjoic2VyaWVzb3J0ZXIiLCJvcmlnX2lhdCI6MTU0MTg1MjQxNCwidXNlcmlkIjo1MTQwMjgsInVzZXJuYW1lIjoibHVjYXNkYWhsZ3JlbmFibiJ9.aoKren7UjDpaMVceVqR-hfVK-8Sq0vYCOuzpJNmVUFKTE3X7nF2OZ46CI3TMprZhU3f56eogFH0DtKLlSUKiZygSnw3c91I_d4tXwkIhrR9pfwvabgsp28XtmJO5updH7UCDjRuf24-XKaSGJ7vjldilzJeHxgGd9g9mn_XKo9wwCAonXW_ChpO_mEDW-sBGUq4srsWY-5xVzKsxW5Dd7Iu3VOYbP8CHS_fxJzcRIJdrj1_pvwpPTuxNyk2-2Jjl3NkqR4g38sSxLAzV0CUN1bpD8N5dOFLgiRRsdd9Vpl_w-UxN32mFYGTmAjMGg00mp6s4-QfYKvDk9NQ_I3CZ7Q",
            header: ""
        }
        // this.fetch_token("https://api.thetvdb.com/login", "HAHTDKZQ5FWWZ8VR","lucasdahlgrenabn","25T9UNL5DY3FIRXP");
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
            .catch(err => console.error(err))
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
