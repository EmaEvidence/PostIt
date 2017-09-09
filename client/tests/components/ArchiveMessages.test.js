import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ArchiveMessages } from '../../components/ArchiveMessages';

describe('ArchiveMessages component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = mount(<ArchiveMessages archivedMessages={JSON.stringify([])} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('No Message Yet');
    expect(wrapper.find('h2').text()).toEqual('Archived Messages');
  });

  it('render without crashing if there is message', () => {
    const messages = [{
      message: 'Here we are',
      priority: 'Normal',
      createdAt: '19/12/2017'
    }];
    const wrapper = mount(<ArchiveMessages archivedMessages={JSON.stringify(messages)} />);
    expect(wrapper.find('p').text()).toEqual('Here we areSender: Normal19/12/2017EditDeleteSeen by ');
  });
});
