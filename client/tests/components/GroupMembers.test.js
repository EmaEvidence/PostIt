import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { GroupMembers } from '../../components/GroupMembers';

describe('GroupMembers component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<GroupMembers members={JSON.stringify([])} />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(1);
  });

  it('render without crashing if there is search Result', () => {
    const wrapper = shallow(<GroupMembers members={JSON.stringify([{ id: 1, username: 'Evidence' }])} />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
});
