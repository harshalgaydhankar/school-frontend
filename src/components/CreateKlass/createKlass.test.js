import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';

import httpAdapter from 'axios/lib/adapters/http'

import CreateKlass from './createKlass';

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
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper.find(".create-klass").length).to.equal(1);
  });

  it('should call preventdefault when the button is clicked', () => {
    const wrapper = mount(<CreateKlass />);
    const stub = sinon.stub();
    wrapper.find('button').simulate('click',{preventDefault : stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should show error message when no name is passed', () => {
    const wrapper = mount(<CreateKlass />);
    wrapper.find('#klassName').get(0).value = '';
    wrapper.find('#semester').get(0).value = '2017-01-01';
    wrapper.find('#credits').get(0).value = 6;
    wrapper.find('#fees').get(0).value = 5000;
    wrapper.find('#dept').get(0).value = 'SCIENCE';   
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal("Name required");
  });
 
    it('should show error message when no semester is passed', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('#klassName').get(0).value = 'klassName';
        wrapper.find('#semester').get(0).value = '';
        wrapper.find('#credits').get(0).value = 6;
        wrapper.find('#fees').get(0).value = 5000;
        wrapper.find('#dept').get(0).value = 'SCIENCE';   
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Semester start date required");
    });
    
    it('should show error message when no credits are passed', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('#klassName').get(0).value = 'klassName';
        wrapper.find('#semester').get(0).value = '2017-01-01';
        wrapper.find('#credits').get(0).value = '';
        wrapper.find('#fees').get(0).value = 5000;
        wrapper.find('#dept').get(0).value = 'SCIENCE';   
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Credits required");
    });
    it('should show error message when no fee is passed', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('#klassName').get(0).value = 'klassName';
        wrapper.find('#semester').get(0).value = '2017-01-01';
        wrapper.find('#credits').get(0).value = 6;
        wrapper.find('#fees').get(0).value = '';
        wrapper.find('#dept').get(0).value = 'SCIENCE';   
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Fees required");
    });
   
    
    it('should not show error message when ALL DATA IS  good', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('#klassName').get(0).value = 'klassName';
        wrapper.find('#semester').get(0).value = '2017-01-01';
        wrapper.find('#credits').get(0).value = 6;
        wrapper.find('#fees').get(0).value = 5000;
        wrapper.find('#dept').get(0).value = 'SCIENCE';   
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal(undefined);
    });

  it('should create a klass', (done) => {
      
      const payload = {
         name : 'klassName',
         semester : '2017-01-01',
         credits : 6,
         department : 'SCIENCE',
         fee : 5000
     }

    nock("http://proxy.com")
    .post("/klasses",payload)
    .reply(200, payload)
    
    const stub = sinon.stub();
    const wrapper = mount(<CreateKlass host="http://proxy.com" created={stub} />);
    wrapper.find('#klassName').get(0).value = 'klassName';
    wrapper.find('#semester').get(0).value = '2017-01-01';
    wrapper.find('#credits').get(0).value = 6;
    wrapper.find('#fees').get(0).value = 5000;
    wrapper.find('#dept').get(0).value = 'SCIENCE';

    wrapper.find('button').simulate('click');
    
    setTimeout(()=>{
        try{
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal(payload);
            expect(wrapper.find('input').get(0).value).to.equal('');
            done();
        }catch(e){
            done.fail(e);
        }
    },1000)
  });

    it('should server get crashed', (done) => {
      const payload = {
         name : 'klassName',
         semester : '2017-01-01',
         credits : 6,
         department : 'SCIENCE',
         fee : 5000
     }
    nock("http://proxy.com")
    .post("/klasses",payload)
    .replyWithError('Server Crashed')
    const stub = sinon.stub()
    const wrapper = mount(<CreateKlass host="http://proxy.com" created={stub} />);
    wrapper.find('#klassName').get(0).value = 'klassName';
    wrapper.find('#semester').get(0).value = '2017-01-01';
    wrapper.find('#credits').get(0).value = 6;
    wrapper.find('#fees').get(0).value = 5000;
    wrapper.find('#dept').get(0).value = 'SCIENCE';   
    wrapper.find('button').simulate('click');
    
    setTimeout(()=>{
        try{
            expect(stub.callCount).to.equal(0);           
            expect(wrapper.find('input').get(0).value).to.equal('klassName');
            expect(wrapper.state('error')).to.equal('Server Crashed');
            done();
        }catch(e){
            done.fail(e);
        }
    },1000)
  });

});