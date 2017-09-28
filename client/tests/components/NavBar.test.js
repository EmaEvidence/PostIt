import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NavBar } from '../../components/NavBar';

describe('NavBar component should', () => {
  xit('renders without crashing if no user is logged in', () => {
    const wrapper = shallow(<NavBar loggedInStatus={false} userDetails={JSON.stringify({})} />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('a').length).toBe(6);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('li').length).toBe(4);
    expect(wrapper.find('a').first().text()).toEqual('Post IT');
  });

  xit('render without crashing if a user is logged in', () => {
    const wrapper = shallow(<NavBar loggedInStatus userDetails={JSON.stringify({ username: 'Evidence' })} />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('a').length).toBe(8);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('li').length).toBe(11);
    expect(wrapper.find('a').first().text()).toEqual('Post IT');
    expect(wrapper.contains('Log Out')).toBe(true);
    expect(Object.keys(wrapper.props()).length).toBe(3);
  });
});
