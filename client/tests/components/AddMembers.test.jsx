
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { AddMembers } from '../../components/AddMembers';

describe('AddMembers component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<AddMembers searchResult={JSON.stringify([])} />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('table').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h6').length).toBe(1);
  });

  it('render without crashing if there is search Result', () => {
    const wrapper = shallow(<AddMembers searchResult={JSON.stringify([{ id: 1, username: 'Evidence' }])} />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('table').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
});
