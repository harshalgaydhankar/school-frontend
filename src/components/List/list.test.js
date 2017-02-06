import React from 'react';
import {shallow , mount, render} from 'enzyme';
import {expect} from 'chai';
import List from './list';
import sinon from 'sinon';
import Box from '../Box/box'
let students;

describe('List',() => {
    beforeEach(() => {
    students = [
             {id:"2",text:"bob",css:"selected"},
             {id:"4",text:"alice",css:"empty"}
             ];  
    });
    it('should render without error',() => {
       
        const wrapper = mount(<List header="Students" items={students}/>);
        expect(wrapper).to.be.ok;
    });

    it('should find components using its class name', () => {
        
        const wrapper = shallow(<List header="Students" items={students} />);       
        expect(wrapper.find(".list").length).to.equal(1);
    });

    it('should get header from component', () => {
        
        const wrapper = shallow(<List header="Students" items={students} />);       
        expect(wrapper.find('h1').text()).to.equal('Students');
    });

    it('should render out 2 boxes', () => {
        
        const wrapper = mount(<List header="Students" items={students} />);
        expect(wrapper.find(".box").length).to.equal(2);
    });

    it('should should display alice in second box', () => {
       
        const wrapper = mount(<List header="Students" items={students} />);
       
        expect(wrapper.find(Box).at(1).find("div > div").text()).to.equal("alice");
    });

    it('should click on second box', () => {
             
        const stub = sinon.stub();
        const wrapper = mount(<List click={stub} header="Students" items={students} />);    
        wrapper.find(Box).at(1).find('div > div').simulate('click');
        expect(stub.callCount).to.equal(1);
    });



    //  it('should get css class from the component', () => {
    //     const wrapper = shallow(<Box css="selected" />);
    //     expect(wrapper.html()).to.equal('<div class="box"><div class="selected"></div></div>');
    // });

    //  it('should get primary key [id] from component', () => {
    //     const wrapper = shallow(<Box id="5" />);
    //     expect(wrapper.html()).to.equal('<div class="box"><div data-id="5"></div></div>');
    // });

     

    //  it('should call parent function when clicked', () => {
    //     const stub = sinon.stub();
    //     const wrapper = mount(<Box click={stub} />);
    //     wrapper.find('.box > div').simulate('click');
    //     expect(stub.callCount).to.equal(1);      
    // });
});

