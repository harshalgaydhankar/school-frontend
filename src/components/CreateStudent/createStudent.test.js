import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';

import httpAdapter from 'axios/lib/adapters/http'

import CreateStudent from './CreateStudent';
axios.defaults.adapter = httpAdapter;

describe('List', () => {
  beforeEach(() => {
      nock.disableNetConnect();
  });
  afterEach(() => {
      nock.cleanAll();
      nock.enableNetConnect();
  });
  it('should render without error', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper.find(".create-student").length).to.equal(1);
  });

  it('should call preventdefault when the button is clicked', () => {
    const wrapper = mount(<CreateStudent />);
    const stub = sinon.stub();
    wrapper.find('button').simulate('click',{preventDefault : stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should show error message when email is too short', () => {
    const wrapper = mount(<CreateStudent />);
    wrapper.find('input').get(0).value = 'small';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal("Email is too short");
  });

  it('should not show error message when email is good', () => {
    const wrapper = mount(<CreateStudent />);
    wrapper.find('input').get(0).value = 'small@lol.com';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal(undefined);
  });

  it('should create a student', (done) => {
    nock("http://proxy.com")
    .post("/students",{email : "hansa@lol.com"})
    .reply(200, {id : 2, email : 'hansa@lol.com'})
    const stub = sinon.stub()
    const wrapper = mount(<CreateStudent host="http://proxy.com" created={stub} />);
    wrapper.find('input').get(0).value = 'hansa@lol.com';
    wrapper.find('button').simulate('click');
    
    setTimeout(()=>{
        try{
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal({id:2,email:'hansa@lol.com'});
            expect(wrapper.find('input').get(0).value).to.equal('');
            done();
        }catch(e){
            done.fail(e);
        }
    },1000)
  });

    it('should server get crashed', (done) => {
    nock("http://proxy.com")
    .post("/students",{email : "hansa@lol.com"})
    .replyWithError('Server Crashed')
    const stub = sinon.stub()
    const wrapper = mount(<CreateStudent host="http://proxy.com" created={stub} />);
    wrapper.find('input').get(0).value = 'hansa@lol.com';
    wrapper.find('button').simulate('click');
    
    setTimeout(()=>{
        try{
            expect(stub.callCount).to.equal(0);
            
            expect(wrapper.find('input').get(0).value).to.equal('hansa@lol.com');
            expect(wrapper.state('error')).to.equal('Server Crashed');
            done();
        }catch(e){
            done.fail(e);
        }
    },1000)
  });

});