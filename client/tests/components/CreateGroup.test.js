import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { CreateGroup } from '../../components/CreateGroup';

describe('CreateGroup component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CreateGroup />);
    const event = {
      target: {
        name: 'groupName',
        value: 'Andela',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().groupName).toEqual('Andela');
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h6').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('h2').text()).toEqual(' Create a Group ');
    expect(Object.keys(wrapper.props()).length).toBe(3);
  });
});
