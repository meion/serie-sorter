import createStore from 'unistore';
import RequestService from './tools/RequestService';
const config = window.config;

export default createStore({
    series:[],
    movies:[],
    serienames:[],
    settings:{
      show_all_from_series:"",
      cache_for_offline:"",
      remove_trash_files:"",
      run_file_drone:"",
      manual_import_route_active:"",
      deactivate_series_route:"",
      deactivate_movies_route:"",
      deactivate_calendar_route:"",
      activate_services:"",
      activate_unfound_sources:"",
      throttle_requests:""
    },
    src: config.has('src') ? config.get('src') : "set src-folder",
    client: new RequestService()
  });
