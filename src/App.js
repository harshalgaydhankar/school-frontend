import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sum from './components/Sum/sum'
import Box from './components/Box/box'
import List from './components/List/list'
import CreateStudent from './components/CreateStudent/createStudent'
import CreateKlass from './components/CreateKlass/createKlass'
import Registration from './components/Registration/registration'




class App extends Component {

  constructor(props){
    super(props);
    this.studentCreated=this.studentCreated.bind(this);
  }

  studentCreated(){
    console.log('in created');
  }

  render() {
    const items = [];
    return (
        <div className="App">
        <Registration host="http://localhost:9000"/>
        </div>
      
    );
  }
}

export default App;
