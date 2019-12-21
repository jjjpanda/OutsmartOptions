import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Help from '../../src/help.js';

describe('Help Test', () => {
  it('Help Render', () => {
    shallow(<Help />);
  });
  test('Help', () => {
    const component = renderer.create(
      <Help />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});