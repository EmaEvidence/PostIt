import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { SentMessages } from '../../components/SentMessages';

describe('SentMessages component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = mount(<SentMessages myMessages={JSON.stringify([])} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h2').text()).toEqual('Sent Messages');
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('No Message Yet');
  });

  it('render without crashing if there is message', () => {
    const messages = [{
      id: 1,
      message: 'Here we are',
      priority: 'Normal',
      createdAt: '19/12/2017'
    }];
    const wrapper = mount(<SentMessages myMessages={JSON.stringify(messages)} />);
    expect(wrapper.find('p').text()).toEqual('Here we areNormal19/12/2017EditDelete');
    expect(wrapper.find('button').length).toBe(1);
  });
});
