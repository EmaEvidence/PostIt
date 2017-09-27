import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { AllMessages } from '../../components/AllMessages';

describe('AllMessages component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = mount(<AllMessages messages={JSON.stringify([])} groupName={''} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('No new Message.');
    expect(wrapper.find('h2').text()).toEqual('Please Select a Group. ');
  });

  it('render without crashing if there is message', () => {
    const wrapper = mount(<AllMessages
      messages={JSON.stringify([{
        message: 'Here we are',
        priority: 'Normal',
        createdAt: '19/12/2017'
      }])}
      groupName={'Yoyo'}
    />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('h2').text()).toEqual('Messages for Yoyo ');
  });
});
