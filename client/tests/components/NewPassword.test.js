import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NewPassword } from '../../components/NewPassword';

describe('NewPassword component should', () => {
  it('renders without crashing', () => {
    const event = {
      target: {
        name: 'password',
        value: 'qwerty123@',
      }
    };
    const wrapper = shallow(<NewPassword />);
    wrapper.instance().onChange(event);
    expect(wrapper.state().password).toEqual('qwerty123@');
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('a').text()).toEqual('<SubmitButton />');
    expect(wrapper.find('h3').text()).toEqual(' Reset Password ');
    expect(wrapper.find('p').first().text())
    .toEqual('Please use the Form Below to Reset Your Password');
    expect(Object.keys(wrapper.props()).length).toBe(3);
  });
});
