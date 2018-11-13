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
// export class TvMaze{
//     constructor(name){
//         this.test(name)
//     }
//     test(name){
//         fetch_get(`http://api.tvmaze.com/search/shows?q=${name.replace(/\s/g, "+")}`).then(val => {
//             if(val){
//                 // let serie = val[0];
//                 // console.log(serie);
//             }
//         })
//     }
// }
// export default class TvDB{
//     constructor(){
//         this.state = {
//             client: new httpClient()
//         }
//     }
//     async fetch_images(id){
//         let url = `https://api.thetvdb.com/series/${id}/images//query?keyType=poster`
//         return new Promise((resolve, reject) => {
//             this.state.client.fetch_get_url(url)
//                 .then(val => {
//                     resolve(val)
//                 })
//                 .catch(err => reject(err))
//         }
//         );}
//     async fetch_episode(id,season,episode_number){
//         let url = `https://api.thetvdb.com/series/${id}/episodes/query?airedSeason=${season}&airedEpisode=${episode_number}`;
//         return await this.state.client.fetch_get_url(url);
//     }
//     async search_for_serie(name=null, imdbId=null, zap2itID=null){
//         let url = ""
//         if(imdbId){
//             url = "https://api.thetvdb.com/search/series?imdbId=" + imdbId;
//         }else{
//             url = "https://api.thetvdb.com/search/series?name=" + name.replace(/\s/g, "+");
//         }
//         let resp = await this.state.client.fetch_get_url(url);
//         let likelySerie = {id:218401} //random fallback id
//         if(resp.data && name){
//             likelySerie = parseSerieSearch(resp.data, name);
//         }else if(resp.data && imdbId){
//             //this is supposedly a definitive match
//             likelySerie = resp.data;
//         }
//         if(name){
//             return {
//                 images: await this.fetch_images(likelySerie.id),
//                 id: likelySerie.id,
//                 desc: likelySerie.overview
//             }
//         }
//         return likelySerie;
//     }
// }
