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
    this.onKlassClick = this.onKlassClick.bind(this);
    this.state={students:[],klasses : [],coreKlasses:[]}
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
  
  onKlassClick(event){
        const klassId = event.target.getAttribute("data-id");
        const css = event.target.getAttribute("class");
        let studentId = 0 ; 
        this.state.students.forEach((item)=>{
            item.css == 'selected' ? studentId = item.id : 0;
        })
        let url = this.props.host;    
        if(css == 'selected'){
            url = url +"/klasses/"+klassId+"/remove/"+studentId;
            axios.delete(url).
            then(rsp =>{
                //console.log(rsp.data)
                this.getStudents();
         
            }).catch(e => {
                console.log(e);
            }); 
        }
        else{
            url = url +"/klasses/"+klassId+"/add/"+studentId;
            axios.post(url).
            then(rsp =>{
                //console.log(rsp.data)
                this.getStudents();
         
            }).catch(e => {
                console.log(e);
            }); 
        }

          

  }

  onStudentClick(event){
      const id=event.target.getAttribute("data-id");
      const students = this.state.students;
      const klasses = this.state.klasses;
      students.forEach((item,index)=>{
          
          item.id == id ? item.css = 'selected' : item.css = 'empty';
      })
      this.setState({students});
      const url = this.props.host + '/students/'+id+'/klasses';
        axios.get(url).
        then(rsp =>{
            const registedKlasses = rsp.data.map((element,index)=>{
                return {
                    id : element.id,
                    text : element.email,
                    css : 'empty'
                }
            });
            klasses.forEach((klass,index) =>{
                klass.css='empty';
            })
            klasses.forEach((klass,index) =>{
                registedKlasses.forEach((regKlass,index) =>{
                    klass.id == regKlass.id ? klass.css = 'selected' : 0;
                })
            })
            this.setState({klasses});
            
        }).catch(e => {
            this.setState({error : e.message});
        });

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
         const coreKlasses = rsp.data;
         const klasses = coreKlasses.map((element,index)=>{
            return {
                id : element.id,
                text : element.name,
                css : 'empty'
            }
         });
         
         this.setState({klasses,coreKlasses})
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
                <List header="Klasses" items={this.state.klasses} click={this.onKlassClick}/>
            </div>
          </div>

        </div>
      
    );
  }
}


