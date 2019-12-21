import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Login from '../../src/login.js';

describe('Login Test', () => {
  it('Login Render', () => {
    shallow(<Login />);
  });
  test('Login', () => {
    const component = renderer.create(
      <Login />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});