import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import {Provider} from 'unistore/react';
import store from './store';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Menu />
        </Provider>

      </div>
    );
  }
}
export default App;
