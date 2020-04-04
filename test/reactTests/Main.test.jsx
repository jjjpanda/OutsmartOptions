import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Main from '../../src/Main.jsx';

describe('Main Test', () => {
  it('Main Render', () => {
    shallow(<Main />);
  });
  test('Main', () => {
    const component = renderer.create(
      <Main />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
