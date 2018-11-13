import createStore from 'unistore';
// import React from 'react';
// import Serie from './components/Serie';
// import {flatten, getExclusiveNames, extractAllmkv, getContent} from './tools/Utils'
import RequestService from './tools/RequestService';
// const config = window.config;

export default createStore({
    series:[],
    serienames:[],
    src:"Set src-folder",
    client: new RequestService()
  });
