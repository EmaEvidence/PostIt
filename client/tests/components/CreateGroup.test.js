import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { CreateGroup } from '../../components/CreateGroup';

describe('CreateGroup component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CreateGroup />);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h6').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual(' Create a Group ');
  });
});
