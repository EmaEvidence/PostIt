import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { SignUp } from '../../components/SignUp';

describe('Notification component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('GoogleLogin').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Sign Up ');
  });
  xit('renders without crashing', () => {
    const wrapper = mount(<SignUp
      notifications={[{
        type: 'New Message',
        groupName: 'Yoyo',
        groupId: 1,
        id: 1
      }]}
    />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').text()).toEqual('New Message in Yoyo');
  });
});
