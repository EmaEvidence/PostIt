import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Input from '../../components/Input';

describe('Input component should', () => {
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });
});
