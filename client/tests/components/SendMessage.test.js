import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { SendMessage } from '../../components/SendMessage';

describe('SendMessage component should', () => {
  const props = {
    groups: JSON.stringify({ 0: ['Evidence', 'Ayo'] }),
    createGroupAction: jest.fn(),
    postMessageAction: jest.fn(),
    preventDefault: jest.fn(),
    display: JSON.stringify({ display: 'block' })
  };
  it('renders without crashing if there is no message', () => {
    const wrapper = shallow(<SendMessage {...props} />);
    const event = {
      target: {
        name: 'message',
        value: 'Welcome to Andela',
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().message).toEqual('Welcome to Andela');
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('fieldset').length).toBe(1);
    expect(wrapper.find('legend').length).toBe(1);
    expect(wrapper.instance().charactersRemaining({ target: { value: 'example' } }));
    expect(wrapper.instance().handleValueChange());
  });
});
