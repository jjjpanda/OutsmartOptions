import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import LoginPage from '../../src/UserPage';

describe('Login Test', () => {
  it('Login Render', () => {
    shallow(<LoginPage />);
  });
  test('Login', () => {
    const component = renderer.create(
      <LoginPage />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
