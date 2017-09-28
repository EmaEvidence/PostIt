import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../components/SignUp';
import userSignUpRequest from '../../actions/userSignUpAction';
import authUser from '../../actions/authAction';


describe('SignUp component should', () => {
  const wrapper = shallow(
      <SignUp userSignup={userSignUpRequest} authUser={authUser} />);
  const event = {
    target: {
      name: 'name',
      value: 'Dan',
    }
  };
  it('renders without crashing', () => {
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('Dan');
    expect(wrapper.state('username')).toBe('');
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Sign Up ');
  });
  it('should call the onSubmit function', () => {
    const mockSubmit = {
      preventDefault: () => jest.fn(),
      userSign: () => jest.fn(),
    };
    wrapper.find('form').simulate('submit', mockSubmit);
    expect(mockSubmit.preventDefault).toBeCalledWith(1);
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
  });
  it('should call the checkPassword function', () => {
    const mockPasswordCheck = {
      checkPassword: () => {}
    };
    wrapper.find('#confirmPassword').simulate('keyUp', mockPasswordCheck);
    expect(mockPasswordCheck.checkPassword).toBeCalledWith(1);
  });
});
