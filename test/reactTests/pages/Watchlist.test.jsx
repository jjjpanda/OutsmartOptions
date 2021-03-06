import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Watchlist from '../../../src/pages/Watchlist.jsx';

describe('Watch Test', () => {
  it('Watchlist Render', () => {
    shallow(<Watchlist />);
  });
  test('Watch', () => {
    const component = renderer.create(
      <Watchlist />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
