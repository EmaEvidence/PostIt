import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { MessageBoard } from '../../components/MessageBoard';

describe('SignUp component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MessageBoard />);
    const event = {
      target: {
        name: 'name',
        value: 'Dan',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('Dan');
    expect(wrapper.state().username).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Sign Up ');
  });
});
