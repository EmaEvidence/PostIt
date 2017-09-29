import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { ForgotPassword } from '../../components/ForgotPassword';

describe('ForgotPassword component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ForgotPassword />);
    const event = {
      target: {
        name: 'email',
        value: 'Dan@gmail.com',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().email).toEqual('Dan@gmail.com');
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual(' Forgot Password ');
    expect(wrapper.instance().clearState());
  });
});
