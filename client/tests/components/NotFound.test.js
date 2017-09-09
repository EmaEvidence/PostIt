import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

describe('NotFound component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toEqual(' click here ');
    expect(wrapper.find('h1').first().text()).toEqual(' 404 ');
  });
});
