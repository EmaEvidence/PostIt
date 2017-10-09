
import React from 'react';
import { shallow } from 'enzyme';
import { AddMembers } from '../../components/AddMembers';

describe('AddMembers component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<AddMembers searchResult={JSON.stringify([])} />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('table').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
  });

  it('render without crashing if there is search Result', () => {
    const props = {
      searchResult: JSON.stringify([{ id: 1, username: 'Evidence' }])
    };
    const wrapper = shallow(<AddMembers
      {...props}
    />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('table').length).toBe(2);
    expect(wrapper.find('tr').length).toBe(2);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(Object.keys(wrapper.props()).length).toBe(3);
  });

  it('should call all methods of the class', () => {
    const props = {
      addNewMemberAction: jest.fn(),
      searchUserAction: jest.fn(),
      clearStatusAction: jest.fn(),
      searchResult: JSON.stringify([{ id: 1, username: 'Evidence' }])
    };
    const wrapper = shallow(<AddMembers
      {...props}
    />);
    expect(wrapper.instance().addMember());
    expect(wrapper.instance().handlePageClick({ selected: 1 }));
    expect(wrapper.instance().clearState());
  });
});
