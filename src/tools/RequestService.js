import {parseSerieSearch} from './Utils';
import httpClient from './httpClient';
const fetch = window.fetch;
export async function fetch_get(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }



export default class TvDB{
    constructor(){
        this.state = {
            client: new httpClient()
        }
    }
    async fetch_images(id){
        let url = `https://api.thetvdb.com/series/${id}/images//query?keyType=poster`
        return new Promise((resolve, reject) => {
            this.state.client.fetch_get_url(url)
                .then(val => {
                    resolve(val)
                })
                .catch(err => reject(err))
        }
        );}
    async fetch_episode(id,season,episode_number){
        let url = `https://api.thetvdb.com/series/${id}/episodes/query?airedSeason=${season}&airedEpisode=${episode_number}`;
        return await this.state.client.fetch_get_url(url);
    }
    async search_for_serie(name=null, imdbId=null, zap2itID=null){
        let url = ""
        if(imdbId){
            url = "https://api.thetvdb.com/search/series?imdbId=" + imdbId;
        }else{
            url = "https://api.thetvdb.com/search/series?name=" + name.replace(/\s/g, "+");
        }
        let resp = await this.state.client.fetch_get_url(url);
        let likelySerie = {id:218401} //random fallback id
        if(resp.data && name){
            likelySerie = parseSerieSearch(resp.data, name);
        }else if(resp.data && imdbId){
            //this is supposedly a definitive match
            likelySerie = resp.data;
        }
        if(name){
            return {
                images: await this.fetch_images(likelySerie.id),
                id: likelySerie.id,
                desc: likelySerie.overview
            }
        }
        return likelySerie;
    }
}
