import React, { Component } from 'react';
import axios from 'axios';

import List from '../../components/List/list'
import CreateStudent from '../../components/CreateStudent/createStudent'
import CreateKlass from '../../components/CreateKlass/createKlass'

export default class Registration extends Component {

  constructor(props){
    super(props);
    this.studentCreated=this.studentCreated.bind(this);
    this.klassCreated=this.klassCreated.bind(this);
    this.getStudents=this.getStudents.bind(this);
    this.getKlasses=this.getKlasses.bind(this);
    this.onStudentClick = this.onStudentClick.bind(this);
    this.state={students:[],klasses : []}
  }

  componentWillMount(){
    this.getStudents();
    this.getKlasses();
  }

  studentCreated(){
      this.getStudents();
  }
  klassCreated(){
      this.getKlasses();
  }

  onStudentClick(event){
      const id=event.target.getAttribute("data-id");
      const students = this.state.students;
      students.forEach((item,index)=>{
          console.log(id,'===',item.id)
          item.id == id ? item.css = 'selected' : item.css = 'empty';
      })
      console.log(students);
      this.setState({students});
  }

  getStudents(){
     const url = this.props.host + "/students"
     axios.get(url).
     then(rsp =>{
         
         const students = rsp.data.map((element,index)=>{
            return {
                id : element.id,
                text : element.email,
                css : 'empty'
            }
         });
         
         this.setState({students})
         
     }).catch(e => {
         this.setState({error : e.message});
     });
  }

  getKlasses(){
     const url = this.props.host + "/klasses"
     axios.get(url).
     then(rsp =>{
         
         const klasses = rsp.data.map((element,index)=>{
            return {
                id : element.id,
                text : element.name,
                css : 'empty'
            }
         });
         
         this.setState({klasses})
     }).catch(e => {
         this.setState({error : e.message});
     });
  }

  render() {
    
    return (
        <div>
        <h1>Registration</h1>
          <div className="col-xs-12">
            <div className="col-xs-6">
                <CreateStudent host="http://localhost:9000" created={this.studentCreated} />
            </div>
            <div className="col-xs-6">
                <CreateKlass host="http://localhost:9000" created={this.klassCreated} />
            </div>
          </div>

          <div className="col-xs-12">
            <div className="col-xs-6">
                <List header="Students" items={this.state.students} click={this.onStudentClick}/>
            </div>
            <div className="col-xs-6">
                <List header="Klasses" items={this.state.klasses}/>
            </div>
          </div>

        </div>
      
    );
  }
}


