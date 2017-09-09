import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { Notification } from '../../components/Notification';

describe('Notification component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notification notifications={JSON.stringify([{
      type: 'New Message',
      groupName: 'Yoyo',
      groupId: 1,
      id: 1
    }])}
    />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Notification
      notifications={JSON.stringify([{
        type: 'New Message',
        groupName: 'Yoyo',
        groupId: 1,
        id: 1
      }])}
    />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('li').first().text()).toEqual(' New Message posted to Yoyo by  ');
  });
});
