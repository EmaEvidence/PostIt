import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import GoogleLogin from '../../components/GoogleLogin';

describe('GoogleLogin component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GoogleLogin type={'Sign In'} />);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('span').text()).toEqual(' Sign In with Google');
  });
});
