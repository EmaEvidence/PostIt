import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NewPassword from '../../components/NewPassword';

describe('NewPassword component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewPassword store />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('a').text()).toEqual(' click here ');
    expect(wrapper.find('h3').text()).toEqual(' Reset Password ');
    expect(wrapper.find('p').first().text()).toEqual(' Please use the Form Below to Reset Your Password ');
  });
});
