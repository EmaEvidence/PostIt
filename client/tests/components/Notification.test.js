import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { Notification } from '../../components/Notification';

describe('Notification component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notification notifications={[]} />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
  });
  it('renders without crashing', () => {
    const wrapper = mount(<Notification
      notifications={[{
        type: 'New Message',
        groupName: 'Yoyo',
        groupId: 1,
        id: 1
      }]}
    />);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').text()).toEqual('New Message in Yoyo');
  });
});
