import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import HelpPage from '../../../src/pages/HelpPage.jsx';

describe('Help Test', () => {
  it('Help Render', () => {
    shallow(<HelpPage />);
  });
  test('Help', () => {
    const component = renderer.create(
      <HelpPage />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
