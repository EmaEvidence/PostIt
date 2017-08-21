import React from 'react';
import expect from 'expect';
// import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AllMessages } from '../../components/AllMessages';

describe('AllMessages component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = mount(<AllMessages messages={[]} groupName={''} />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('No Message Yet');
    expect(wrapper.find('h2').text()).toEqual(' Messages');
  });

  it('render without crashing if there is message', () => {
    const wrapper = mount(<AllMessages
      messages={[{
        message: 'Here we are',
        priority: 'Normal',
        createdAt: '19/12/2017'
      }]}
      groupName={'Yoyo'}
    />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toEqual('Here we areNormal19/12/2017');
    expect(wrapper.find('h2').text()).toEqual('Yoyo Messages');
  });
});
