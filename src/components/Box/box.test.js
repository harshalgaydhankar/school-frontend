import React from 'react';
import {shallow , mount, render} from 'enzyme';
import {expect} from 'chai';
import Box from './box';
import sinon from 'sinon';

describe('Box',() => {
    it('should render without error',() => {
        const wrapper = shallow(<Box />);
        expect(wrapper).to.be.ok;
    });

    it('should find components using its class name', () => {
        const wrapper = shallow(<Box />);       
        expect(wrapper.find(".box").length).to.equal(1);
    });

     it('should get the text from component', () => {
        const wrapper = shallow(<Box text="abc@gmail.com" />);        
        expect(wrapper.text()).to.equal('abc@gmail.com');
    });

     it('should get css class from the component', () => {
        const wrapper = shallow(<Box css="selected" />);
        expect(wrapper.html()).to.equal('<div class="box"><div class="selected"></div></div>');
    });

     it('should get primary key [id] from component', () => {
        const wrapper = shallow(<Box id="5" />);
        expect(wrapper.html()).to.equal('<div class="box"><div data-id="5"></div></div>');
    });

     it('should render out full component', () => {
        const wrapper = shallow(<Box css="empty" text="pqr@gmail.com" id="5" />);
        expect(wrapper.html()).to.equal('<div class="box"><div class="empty" data-id="5">pqr@gmail.com</div></div>');
    });

     it('should call parent function when clicked', () => {
        const stub = sinon.stub();
        const wrapper = mount(<Box click={stub} />);
        wrapper.find('.box > div').simulate('click');
        expect(stub.callCount).to.equal(1);      
    });
});
