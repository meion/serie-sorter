import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Menu} />
        </Router>
      </div>
    );
  }
}

export default App;
