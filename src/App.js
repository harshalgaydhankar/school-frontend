import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sum from './components/Sum/sum'
import Box from './components/Box/box'
import List from './components/List/list'



class App extends Component {
  render() {
     const students = [
             {id:"2",text:"bob",css:"selected"},
             {id:"4",text:"alice",css:"empty"}
             ];
        
    return (
        <div className="App">
          <h1>Class Front</h1>
          <List header="Students" items={students} />
        </div>
      
    );
  }
}

export default App;
