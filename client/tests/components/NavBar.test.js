import React from 'react';
import expect from 'expect';
// import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NavBar } from '../../components/NavBar';

describe('NavBar component should', () => {
  it('renders without crashing if no user is logged in', () => {
    const wrapper = shallow(<NavBar logged_in_status={false} user_details={JSON.stringify({})} />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('a').length).toBe(6);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('li').length).toBe(4);
    expect(wrapper.find('a').first().text()).toEqual('Post IT');
  });

  it('render without crashing if a user is logged in', () => {
    const wrapper = shallow(<NavBar logged_in_status user_details={JSON.stringify({ username: 'Evidence' })} />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('b').length).toBe(1);
    expect(wrapper.find('b').text()).toEqual('Welcome Evidence, how are you doing?');
    expect(wrapper.find('a').length).toBe(8);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('li').length).toBe(12);
    expect(wrapper.find('a').first().text()).toEqual('Post IT');
    expect(wrapper.contains('Log Out')).toBe(true);
  });
});
