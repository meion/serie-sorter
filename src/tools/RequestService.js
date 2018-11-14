const fetch = window.fetch;
export async function fetch_get(url) {
    // console.log(url)
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }
export default class RequestService{
    constructor(){
        this.state = {
            token: '0e47c0710cd0f340979cb6fa69885fc4'
        }
        this.addtoken = this.addtoken.bind(this);
    }
    async fetch_serie_by_imdbid(id){
        let url = `${this.addtoken(`https://api.themoviedb.org/3/find/${id}`)}&external_source=imdb_id`;
        try{
            return await fetch_get(url);
        }catch(err){
            console.error(err)
        }
    }
    async fetch_episode(id, season, episode){
        let url = `${this.addtoken(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}`)}`
        try{
            return await fetch_get(url);
        }catch(err){
            console.error(err)
        }
    }
    async search_for_serie(name){
        name = name.replace(/\s/g, "+");
        let url = `${this.addtoken("https://api.themoviedb.org/3/search/tv")}&query=${name}`
        try{
            return await fetch_get(url);
        }catch(err){
            console.log(err)
        }
    }
    async search_for_movie(name){
        // console.log(name.name)
        // FIX REGEXP FOR NOW =>
        name = name.name.split(" ").filter(val => {
            let parsed = parseInt(val, 10);
            if(isNaN(parsed)) return true;
            return false;

        }).reduce((acc, curr) => acc+' '+curr);
        let url = `${this.addtoken("https://api.themoviedb.org/3/search/movie")}&query=${name}`
        try{
            return await fetch_get(url);
        }catch(err){
            console.log(err)
        }
    }
    addtoken(url){
        // console.log(url);
        return url+`?api_key=0e47c0710cd0f340979cb6fa69885fc4`
    }
}
