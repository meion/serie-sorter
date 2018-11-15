import createStore from 'unistore';
import RequestService from './tools/RequestService';
const config = window.config;

export default createStore({
    series:[],
    movies:[],
    serienames:[],
    settings:{
      show_all_from_series:false,
      cache_for_offline:false,
      remove_trash_files:false,
      run_file_drone:false,
      manual_import_route_active:false,
      deactivate_series_route:false,
      deactivate_movies_route:false,
      deactivate_calendar_route:false,
      activate_services:false,
      activate_unfound_sources:false,
      throttle_requests:false
    },
    src: config.has('src') ? config.get('src') : "set src-folder",
    client: new RequestService()
  });
