import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { LogIn } from '../../components/LogIn';

describe('Login component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<LogIn />);
    const event = {
      target: {
        name: 'username',
        value: 'Evidence',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().username).toEqual('Evidence');
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('b').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });
});
