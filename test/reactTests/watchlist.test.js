import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Watch from '../../src/watch.js';

describe('Watch Test', () => {
  it('Watchlist Render', () => {
    shallow(<Watch />);
  });
  test('Watch', () => {
    const component = renderer.create(
      <Watch />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});