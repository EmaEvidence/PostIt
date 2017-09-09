import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { AddMembers } from '../../components/AddMembers';

describe('AddMembers component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<AddMembers searchResult={JSON.stringify([])} />);
    // expect(wrapper.find('ReactPaginate').length).toBe(1);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('table').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h6').length).toBe(1);
    // expect(wrapper.find('form').text()).toEqual('No new Message.');
    // expect(wrapper.find('h2').text()).toEqual('Please Select a Group. ');
  });

  it('render without crashing if there is search Result', () => {
    const wrapper = shallow(<AddMembers searchResult={JSON.stringify([{}])} />);
    // expect(wrapper.find('ReactPaginate').length).toBe(1);
    // expect(wrapper.find('p').length).toBe(1);
    // expect(wrapper.find('p').text()).toEqual('Here we areSender: Normal19/12/2017Seen');
    // expect(wrapper.find('h2').text()).toEqual('Messages for Yoyo ');
  });
});
