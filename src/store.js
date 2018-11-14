import createStore from 'unistore';
import RequestService from './tools/RequestService';
const config = window.config;

export default createStore({
    series:[],
    movies:[],
    serienames:[],
    settings:{},
    src: config.has('src') ? config.get('src') : "set src-folder",
    client: new RequestService()
  });
