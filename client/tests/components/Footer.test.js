import React from 'react';
import expect from 'expect';
// import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Footer } from '../../components/Footer';

describe('Footer component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('footer').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual(' © 2017 Evidence ');
  });
});
