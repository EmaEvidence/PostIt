import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { CreateGroup } from '../../components/CreateGroup';

describe('CreateGroup component should', () => {
  const props = {
    getUserGroupsAction: jest.fn(),
    getUsersAction: jest.fn(),
    preventDefault: jest.fn(),
    users: JSON.stringify([{ id: 1, username: 'Evi' }])
  };
  it('renders without crashing', () => {
    const wrapper = shallow(<CreateGroup
      {...props}
    />);
    const event = {
      target: {
        name: 'groupName',
        value: 'Andela',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().groupName).toEqual('Andela');
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('h2').text()).toEqual(' Create a Group ');
    expect(Object.keys(wrapper.props()).length).toBe(3);
  });

  it('should call all methods of the class', () => {
    const wrapper = shallow(<CreateGroup
      {...props}
    />);
    expect(wrapper.instance().onChange({
      target: {
        name: 'groupName',
        value: 'Andela'
      }
    }));
    expect(wrapper.instance().componentWillMount());
    expect(wrapper.instance().clearState());
    expect(wrapper.instance().chipOnChange());
  });
});
