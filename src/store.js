import createStore from 'unistore';
export const actions = store => ({
    addToSeries: ({series}, serie) => ({series: series.push(serie)}),
    blah:() => console.log('hello'),
    getSeries:({series}) => series
  })
export default createStore({
    series:[]
  });
