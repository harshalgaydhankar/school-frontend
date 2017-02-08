import React from 'react';
import axios from 'axios';
import './createKlass.css';

export default class CreateKlass extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
     e.preventDefault();
     const klassName = this.klassName.value;
     const semester = this.semester.value;
     const credits = +this.credits.value;
     const fees = +this.fees.value;
     const dept = this.dept.value;

     if(klassName == ''){
         this.setState({error : 'Name required'});
         return;
     }
     if(semester == ''){
         this.setState({error : 'Semester start date required'});
         return;
     }
     if(credits == ''){
         this.setState({error : 'Credits required'});
         return;
     }
     if(fees == ''){
         this.setState({error : 'Fees required'});
         return;
     }
     
     if(dept == ''){
         this.setState({error : 'Select department'});
         return;
     }
     const payload = {
         name : klassName,
         semester : semester,
         credits : credits,
         department : dept,
         fee : fees
     }
     const url = this.props.host + "/klasses";
     axios.post(url,payload).
     then(rsp =>{
         
         const klass = rsp.data;
         this.props.created(klass);
         this.klassName.value = "";
         this.semester.value = "";
         this.credits.value = "";
         this.fees.value = "";
         this.dept.value = "";
         this.setState({error : ''});
        
         
     }).catch(e => {
         this.setState({error : e.message});
        
    });
     
  }

  render(){
    return (
      <div className="create-klass">
        <h3>Create Klass</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>
          <div className="form-group">
            <label>Class Name <span> *</span> : </label>
            <input placeholder="for example Chyld's class" className="form-control" ref={n => this.klassName = n} type="text" id="klassName"/>
          </div>

          <div className="form-group">
            <label>Semester<span> *</span> : </label>
            <input id="semester" className="form-control" ref={n => this.semester = n} type="date" />
          </div>

          <div className="form-group">
            <label>Credits <span> *</span> : </label>
            <input id="credits" placeholder="0" className="form-control" ref={n => this.credits = n} type="number" />
          </div>

          <div className="form-group">
            <label>Fees <span> *</span> : </label>
            <input id="fees" placeholder="0" className="form-control" ref={n => this.fees = n} type="number" />
          </div>

          <div className="form-group">
            <label>Department <span> *</span> : </label>
               
            <select id="dept" className="selectpicker" ref={n => this.dept = n} value="">
                <option value="SCIENCE">SCIENCE</option>
                <option value="ENGINEERING">ENGINEERING</option>
                <option value="LITERATURE">LITERATURE</option>
                <option value="PHILOSOPHY">PHILOSOPHY</option>
            </select>
          </div>
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}