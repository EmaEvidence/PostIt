import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NewPassword } from '../../components/NewPassword';

describe('NewPassword component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewPassword />);
    expect(toJson(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('div').length).toBe(3);
    // expect(wrapper.find('form').length).toBe(1);
    // expect(wrapper.find('Input').length).toBe(2);
    // expect(wrapper.find('h3').length).toBe(1);
    // expect(wrapper.find('p').length).toBe(1);
    // expect(wrapper.find('a').text()).toEqual('<SubmitButton />');
    // expect(wrapper.find('h3').text()).toEqual(' Reset Password ');
    // expect(wrapper.find('p').first().text()).toEqual(' Please use the Form Below to Reset Your Password ');
  });
});
