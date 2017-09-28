import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { SendMessage } from '../../components/SendMessage';

describe('SendMessage component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<SendMessage />);
    const event = {
      target: {
        name: 'message',
        value: 'Welcome to Andela',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().message).toEqual('Welcome to Andela');
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('UIAutocomplete').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('b').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('label').length).toBe(2);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('fieldset').length).toBe(1);
    expect(wrapper.find('legend').length).toBe(1);
  });
});
