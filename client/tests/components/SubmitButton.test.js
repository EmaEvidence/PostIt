import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SubmitButton from '../../components/SubmitButton';

describe('Notification component should', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SubmitButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
