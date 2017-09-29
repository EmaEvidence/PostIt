import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../components/SignUp';
import userSignUpRequest from '../../actions/userSignUpAction';
import authUser from '../../actions/authAction';


describe('SignUp component should', () => {
  const setup = () => {
    const props = {
      userSignup: jest.fn(),
      authUser: jest.fn()
    };
    return shallow(<SignUp {...props} />);
  };

  const wrapper = setup();
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
    expect(Object.keys(wrapper.props()).length).toBe(3);
    expect(wrapper.instance().clearState());
  });
});
