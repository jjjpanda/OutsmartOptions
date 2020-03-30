import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import HomePage from '../../../src/pages/HomePage.jsx';

describe('Home Test', () => {
  it('Home Render', () => {
    shallow(<HomePage />);
  });
  test('Home', () => {
    const component = renderer.create(
      <HomePage />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
