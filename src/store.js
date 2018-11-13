import createStore from 'unistore';
import RequestService from './tools/RequestService';


export default createStore({
    series:[],
    serienames:[],
    src:"Set src-folder",
    client: new RequestService()
  });
