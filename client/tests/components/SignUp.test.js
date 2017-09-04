import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { SignUp } from '../../components/SignUp';

const props = {
  onChange: jest.fn(),
  onSubmit: jest.fn()
};
describe('SignUp component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SignUp />);
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
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Sign Up ');
  });
});
